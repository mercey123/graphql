import * as queries from "./queryConst";

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

export async function transactionsAndXp(name: string, onlyTotalXp: boolean): Promise<{
  transactions?: {
    amount: number;
    timestamp: number;
    objectName: string;
  }[];
  totalXp: number;
}> {
  let data = await queryAll(queries.progressQuery, { name, regex: queries.div01Regex, offset: 0 }, "progress")
  let objectIds: number[] = []
  let nameById: { [id: string]: string } = {}

  for (let { object } of data) {
    if (object.id) {
      if (queries.RUST_IDS.includes(object.id)) {
        objectIds = objectIds.concat(queries.RUST_IDS)
        queries.RUST_IDS.forEach(rustId => nameById[rustId] = object.name)
        continue
      }
      nameById[object.id] = object.name
      objectIds.push(object.id)
    }
  }

  let transData = await queryAll(queries.amountQV2, { name, offset: 0, ids: objectIds }, "transaction")
  let objectXp: { [id: string]: number } = {}
  let transactions: { amount: number, timestamp: number, objectName: string }[] = []

  transData.forEach(
    ({ amount, objectId, createdAt }) => {
      if (!objectXp[objectId]) {
        objectXp[objectId] = amount

        if (!onlyTotalXp) {
          transactions.push(
            {
              amount,
              timestamp: new Date(createdAt).getTime(),
              objectName: nameById[objectId]
            }
          )
        }
      }
    }
  )
  let totalXp = Object.values(objectXp).reduce((a: number, b: number) => a + b, 0)
  transactions.sort((a, b) => b.timestamp - a.timestamp)

  if (onlyTotalXp) return {
    totalXp: totalXp
  }
  return {
    transactions: transactions,
    totalXp: totalXp
  }
}

export async function getUser(name: string): Promise<string> {
  let retName: { user: { login: string }[] } = await query(queries.nameQuery, { name })
  if (retName.user && retName.user.length > 0) {
    return retName.user[0].login
  }

  throw new Error('No such user')
}

export async function currLevel(name: string): Promise<number> {
  let currLevel = await query(queries.currLevelQuery, { name, regex: queries.div01Regex })
  currLevel = currLevel.transaction.length > 0 ? currLevel.transaction[0].amount : 0

  return currLevel
}

export async function allUsers() {
  let arr: Promise<
    (string | number)[]
  >[] = []

  for (let user of queries.batch01) {
    let userXp = transactionsAndXp(user, true).then(res => [user, res.totalXp])
    arr.push(userXp)
  }
  let promes = await Promise.all(arr)
  return Object.fromEntries(promes)
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