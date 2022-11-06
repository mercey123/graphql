import * as queries from "./queryConst";

async function getUser(name: string) {
  let retName = await query(queries.nameQuery, { name })
  if (retName.user && retName.user.length > 0) {
    console.log(`Ищу чела: ${retName.user[0].login}`)
    return await personalExp(retName.user[0].login)
  }
}

async function personalExp(name: string) {
  let tempArr: any[] = []

  const variablesProgress = {
    name,
    regex: "\/johvi\/div-01(\/[0-9a-z-]*)?$",
    offset: 0
  }

  while (true) {
    let data = await query(queries.progressQuery, variablesProgress)
    if (!data || data.user[0].progresses.length === 0) {
      break
    }

    data = data.user[0].progresses

    for (let element of data) {
      let transaction = !queries.RUST_IDS.includes(element.object.id) ?
        await query(queries.amountQuery, { name, subject: element.object.id }) :
        await query(queries.rustAmountQuery, { ids: queries.RUST_IDS, name })

      if (transaction.transaction.length === 0) {
        continue
      }
      transaction = transaction.transaction[0]

      tempArr.push(
        {
          objectName: element.object.name,
          timestamp: new Date(transaction.createdAt).getTime(),
          amount: transaction.amount
        }
      )
    }
    variablesProgress.offset += data.length
  }

  let currLevel = await query(queries.currLevelQuery, { name, regex: variablesProgress.regex })
  currLevel = currLevel.transaction.length > 0 ? currLevel.transaction[0].amount : 0

  return {
    username: name,
    totalXp: tempArr.reduce((a: number, b: any) => a + b.amount, 0),
    level: currLevel,
    transaction: tempArr
  }
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

export default getUser