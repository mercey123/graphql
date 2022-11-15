import * as queries from "./queryConst";

async function getUser(name: string) {
  let retName = await query(queries.nameQuery, { name })
  if (retName.user && retName.user.length > 0) {
    console.log(`Ищу чела: ${retName.user[0].login}`)
    let userData = await personalExp(retName.user[0].login)
    userData.audits = await auditRatio(retName.user[0].login)
    // console.log(userData)
    return userData
  }
}

async function allUsers() {
  let data = await queryAll(queries.allStudents, {}, "user")
  let arr: any = []
  for (let user of data) {
    user = user
    let temp = await personalExp(user.login)
    console.log({ [user.login]: temp.totalXp })
    arr.push({ [user.login]: temp.totalXp })
  }
  return arr
}

async function personalExp(name: string) {
  let tempArr: any[] = []

  const variablesProgress = {
    name,
    regex: "\/johvi\/div-01(\/[0-9a-z-]*)?$",
    offset: 0
  }

  let data = await queryAll(queries.progressQuery, variablesProgress, "progress")
  // console.log(data)

  for (let element of data) {
    let transactions = !queries.RUST_IDS.includes(element.object.id) ?
      await queryAll(queries.amountQuery, { name, subject: element.object.id }, "transaction") :
      await queryAll(queries.rustAmountQuery, { ids: queries.RUST_IDS, name }, "transaction")

    if (transactions.length === 0) {
      continue
    }
    let transaction = transactions[0]

    tempArr.push(
      {
        objectName: element.object.name,
        timestamp: new Date(transaction.createdAt).getTime(),
        amount: transaction.amount
      }
    )
  }
  // console.log(tempArr)


  let currLevel = await query(queries.currLevelQuery, { name, regex: variablesProgress.regex })
  currLevel = currLevel.transaction.length > 0 ? currLevel.transaction[0].amount : 0

  return {
    username: name,
    totalXp: tempArr.reduce((a: number, b: any) => a + b.amount, 0),
    level: currLevel,
    transaction: tempArr,
    audits: {}
  }
}

async function auditRatio(name: string) {
  const vars = {
    name,
    offset: 0
  }

  let d = await queryAll(queries.auditQuery, vars, "transaction")

  d = d.map((currAudit) => {
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

  return d
}

async function query(operationsDoc: string, variables: Object) {
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

async function queryAll(searchQuery: string, variables: any, field: string) {
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

export default getUser

allUsers()