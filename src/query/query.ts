import { json } from "stream/consumers";

const url = "https://01.kood.tech/api/graphql-engine/v1/graphql";
const nameQuery =
  `
query MyQuery($name: String) {
  user(where: {login: {_eq: $name}}) {
    login
  }
}
`

const abobus =
  `
query MyQuery($name: String, $regex: String = "", $offset: Int) {
user(where: {login: {_eq: $name}}) {
  progresses(where: {path: {_regex: $regex}, isDone: {_eq: true}}, offset: $offset) {
    path
    object {
      name
    }
  }
}
}
`

async function getUser(name: string) {
  let retName = await query(nameQuery, { name })
  if (retName) {
    personalExp(retName.user[0].login)
  }
}

async function personalExp(name: string) {
  let tempArr: any = []

  const variablesAbobus = {
    name,
    regex: "\\/johvi\\/div-01\\/[0-9a-z-]*$",
    offset: 0
  }

  while (true) {
    let data = await query(abobus, variablesAbobus)
    if (!data || data.user[0].progresses.length < 1) {
      break
    }

    data = data.user[0].progresses
    tempArr.push(...data)

    variablesAbobus.offset += data.length
  }
  console.log(tempArr)
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

  if (!jsonRes.errors && jsonRes.data.user.length < 1) {
    return undefined
  }
  return jsonRes.data
}


export default getUser
