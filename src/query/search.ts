import * as queries from "./queryConst";

export async function getUser(name: string) {
  let retName = await query(queries.nameQuery, { name })
  if (retName.user && retName.user.length > 0) {
    return retName.user[0].login
  }

  throw new Error('No such user')
}

export async function allUsers() {
  let data = await queryAll(queries.allStudents, {}, "user")
  let arr: any = []

  for (let user of data) {
    let temp = await personalTransactions(user.login)
    arr.push({ [user.login]: temp.totalXp })
  }
  return arr
}

export async function personalTransactions(name: string) {//: Promise<Object>
  let transactionsArr: any[] = []

  let data = await queryAll(queries.progressQuery, { name, regex: queries.div01Regex, offset: 0 }, "progress")

  for (let element of data) {
    let transactionWrapper = !queries.RUST_IDS.includes(element.object.id) ?
      await queryAll(queries.amountQuery, { name, subject: element.object.id }, "transaction") :
      await queryAll(queries.rustAmountQuery, { ids: queries.RUST_IDS, name }, "transaction")

    if (transactionWrapper.length === 0) {
      continue
    }
    let transaction = transactionWrapper[0]

    transactionsArr.push(
      {
        objectName: element.object.name, //subject name
        timestamp: new Date(transaction.createdAt).getTime(), //time of transaction
        amount: transaction.amount //transaction amount
      }
    )
  }
  // console.log(transactionsArr)

  return {
    transactions: transactionsArr,
    totalXp: transactionsArr.reduce((a: number, b: any) => a + b.amount, 0)
  }
}

export async function currLevel(name: string): Promise<Number> {
  let currLevel = await query(queries.currLevelQuery, { name, regex: queries.div01Regex })
  currLevel = currLevel.transaction.length > 0 ? currLevel.transaction[0].amount : 0

  return currLevel
}

export async function auditRatio(name: string): Promise<any[]> {
  let allAudits = await queryAll(queries.auditQuery, { name, offset: 0 }, "transaction")

  allAudits = allAudits.map((currAudit) => {
    currAudit.objectName = currAudit.object.name
    delete currAudit.object
    return currAudit
  })

  // let up = d.reduce((prev, curr) => { if (curr.type === "up") { return prev + curr.amount } return prev }, 0)
  // let down = d.reduce((prev, curr) => {
  //   if (curr.type === "down") {
  //     return prev + curr.amount
  //   }
  //   return prev
  // }, 0)

  // console.log(up, down)

  return allAudits
}

export async function query(operationsDoc: string, variables: Object) {
  let result = await fetch(
    "https://01.kood.tech/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
      })
    }
  )
  let jsonRes = await result.json()
  if (jsonRes.errors) {
    return undefined
  }
  return jsonRes.data
}

export async function queryAll(searchQuery: string, variables: any, field: string) {
  let allData = []

  while (true) {
    let data = await query(searchQuery, variables)
    if (data[field].length === 0) {
      break
    }
    allData.push(...data[field])

    variables.offset = allData.length
  }
  return allData
}
