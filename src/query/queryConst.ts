export const URL = "https://01.kood.tech/api/graphql-engine/v1/graphql";
export const nameQuery =
  `
query ($name: String) {
  user(where: {login: {_eq: $name}}) {
    login
  }
}
`

export const currLevelQuery =
  `
query ($name: String, $regex: String = "", $offset: Int){
  transaction(
    where: { user: { login: { _eq: $name } }, type: { _eq: "level" }, path: { _regex: $regex } }
    order_by: { amount: desc_nulls_last }
    offset: $offset
    limit: 1
  ) {
    amount
  }
}
`

export const progressQuery =
  `
query ($name: String, $regex: String = "", $offset: Int) {
progress(
    where: {path: {_regex: $regex}, isDone: {_eq: true}, user: {login: {_eq: $name}}}
    offset: $offset
    order_by: {updatedAt: asc}
  ) {
    object {
      name
      id
    }
    path
  }
}
`

export const amountQuery =
  ` 
query ($subject: Int, $name: String, $offset: Int){
  transaction(
    order_by: {amount: desc_nulls_last}
    where: {object: {id: {_eq: $subject}}, user: {login: {_eq: $name}}, type: {_eq: "xp"}}
    limit: 1
    offset: $offset
  ) {
    amount
    createdAt
  }
}
`

export const rustAmountQuery = `
query ($ids: [Int!], $name: String, $offset: Int) {
  transaction(
    order_by: {amount: desc_nulls_last}
    where: {objectId: {_in: $ids}, user: {login: {_eq: $name}}, type: {_eq: "xp"}}
    limit: 1
    offset: $offset
  ) {
    amount
    createdAt
  }
}
`

export const auditQuery = `
query ($offset: Int, $name: String) {
  transaction(
    where: {type: {_in: ["up", "down"]}, 
    user: {login: {_eq: $name}}}, 
    offset: $offset
    ) {
    amount
    type
    createdAt
    object {
      name
    }
  }
}
`

export const allStudents = `
query ($offset: Int){
  user(
    where: {progresses: {campus: {_eq: "johvi"}, 
    path: {_regex: "/johvi/div-01(/[0-9a-z-]*)?$"}}},
    offset: $offset
  ) {
    login
  }
}
`

export const RUST_IDS = [100978, 3312]
