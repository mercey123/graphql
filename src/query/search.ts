import * as queries from "./queryConst";

export async function getUser(name: string): Promise<string> {
  let retName: { user: { login: string }[] } = await query(queries.nameQuery, { name })
  if (retName.user && retName.user.length > 0) {
    return retName.user[0].login
  }

  throw new Error('No such user')
}

export async function allUsers() {
  let arr: Promise<
    (string | number)[]
  >[] = []

  for (let user of queries.batch01) {
    arr.push(totalXP(user))
  }
  let promes = await Promise.all(arr)
  return Object.fromEntries(promes)
}


export async function currLevel(name: string): Promise<number> {
  let currLevel = await query(queries.currLevelQuery, { name, regex: queries.div01Regex })
  currLevel = currLevel.transaction.length > 0 ? currLevel.transaction[0].amount : 0

  return currLevel
}

export async function auditRatio(name: string): Promise<{ amount: number, createdAt: number, objectName: string, type: string }[]> {
  let allAudits = await queryAll(queries.auditQuery, { name, offset: 0 }, "transaction")

  allAudits = allAudits.map((currAudit) => {
    currAudit.objectName = currAudit.object.name
    delete currAudit.object
    currAudit.createdAt = new Date(currAudit.createdAt).getTime()
    return currAudit
  })

  return allAudits
}

export async function query(operationsDoc: string, variables: Object): Promise<any> {
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

export async function queryAll(searchQuery: string, variables: any, field: string): Promise<any[]> {
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

export async function totalXP(name: string) {
  let tempArr: any = []
  let data = await queryAll(queries.progressQuery, { name, regex: queries.div01Regex, offset: 0 }, "progress")

  for (let { object, path } of data) {
    if (object.id) {
      if (queries.RUST_IDS.includes(object.id)) {
        tempArr = tempArr.concat(queries.RUST_IDS)
        continue
      }
      tempArr.push(object.id)
    }
  }

  let xpAmounts = await queryAll(queries.amountQV2, { name, offset: 0, ids: tempArr }, "transaction")
  let mepmep: { [id: string]: number } = {}

  xpAmounts.forEach(
    ({ amount, objectId }) => {

      if (!mepmep[objectId]) mepmep[objectId] = amount
    }
  )

  return [name, Object.values(mepmep).reduce((a: number, b: number) => a + b, 0)]
}

export async function personalTransactions(name: string): Promise<{ transactions: { objectName: string, timestamp: number, amount: number }[], totalXp: number }> {
  let transactionsArr: { objectName: string, timestamp: number, amount: number }[] = []

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

  return {
    transactions: transactionsArr,
    totalXp: transactionsArr.reduce((a: number, b: { amount: number }) => a + b.amount, 0)
  }
}