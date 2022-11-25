import * as queries from "./queryConst";

async function query(searchQuery: string, variables: Object): Promise<any> {
  let result = await fetch(
    "https://01.kood.tech/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: searchQuery,
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

async function queryAll(searchQuery: string, variables: any, field: string): Promise<any[]> {
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

export async function transactionsAndXp(name: string, onlyTotalXp: boolean = false): Promise<{
  transactions: {
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
    if (!object.id) {
      continue
    }

    if (queries.RUST_IDS.includes(object.id)) {
      objectIds = objectIds.concat(queries.RUST_IDS)
      queries.RUST_IDS.forEach(rustId => nameById[rustId] = object.name)
      continue
    }
    nameById[object.id] = object.name
    objectIds.push(object.id)
  }

  let transData: { amount: number, objectId: string, createdAt: string }[] =
    await queryAll(queries.amountQuery, { name, offset: 0, ids: objectIds }, "transaction")
  let objectXp: { [id: string]: number } = {}
  let transactions: { amount: number, timestamp: number, objectName: string }[] = []

  for (const { amount, objectId, createdAt } of transData) {
    if (objectXp[objectId]) {
      continue
    }
    objectXp[objectId] = amount

    if (onlyTotalXp) {
      continue
    }

    transactions.push(
      {
        amount,
        timestamp: new Date(createdAt).getTime(),
        objectName: nameById[objectId]
      }
    )
  }

  let totalXp = Object.values(objectXp).reduce((a: number, b: number) => a + b, 0)
  transactions.sort((a, b) => b.timestamp - a.timestamp)

  return {
    transactions,
    totalXp
  }
}

export async function getUser(name: string): Promise<string> {
  let retName: { user: { login: string }[] } = await query(queries.nameQuery, { name })
  if (retName.user && retName.user.length > 0) return retName.user[0].login

  throw new Error('No such user')
}

export async function currLevel(name: string): Promise<number> {
  let currLevel: { transaction: { amount: number }[] } = await query(queries.currLevelQuery, { name, regex: queries.div01Regex })

  return currLevel.transaction.length > 0 ? currLevel.transaction[0].amount : 1
}

export async function allUsers(): Promise<{ [user: string]: number }> {
  let arr: Promise<(string | number)[]>[] = []

  for (let user of queries.batch01) {
    let userXp = transactionsAndXp(user, true).then(res => [user, res.totalXp])
    arr.push(userXp)
  }
  let promes = await Promise.all(arr)
  return Object.fromEntries(promes)
}

export async function auditRatio(name: string): Promise<{ amount: number, createdAt: number, objectName: string, type: string }[]> {
  let allAudits: { object: { name: string }, amount: number, type: string, createdAt: string }[] =
    await queryAll(queries.auditQuery, { name, offset: 0 }, "transaction")

  return allAudits.map(({ object: { name }, amount, type, createdAt }) => ({ amount, createdAt: new Date(createdAt).getTime(), objectName: name, type }))
}