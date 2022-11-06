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
query ($name: String, $regex: String = ""){
  transaction(
    where: { user: { login: { _eq: $name } }, type: { _eq: "level" }, path: { _regex: $regex } }
    order_by: { amount: desc_nulls_last }
    limit: 1
  ) {
    amount
  }
}
`

export const progressQuery =
    `
query ($name: String, $regex: String = "", $offset: Int) {
user(where: {login: {_eq: $name}}) {
  progresses(where: {path: {_regex: $regex}, isDone: {_eq: true}}, offset: $offset, order_by: {updatedAt: asc}) {
    object {
      name
      id
    }
  path
  }
}
}
`

export const amountQuery =
    ` 
query ($subject: Int, $name: String){
  transaction(
    order_by: {amount: desc_nulls_last}
    where: {object: {id: {_eq: $subject}}, user: {login: {_eq: $name}}, type: {_eq: "xp"}}
    limit: 1
  ) {
    amount
    createdAt
  }
}
`

export const rustAmountQuery = `
query ($ids: [Int!], $name: String) {
  transaction(
    order_by: {amount: desc_nulls_last}
    where: {objectId: {_in: $ids}, user: {login: {_eq: $name}}, type: {_eq: "xp"}}
    limit: 1
  ) {
    amount
    createdAt
  }
}
`

export const RUST_IDS = [100978, 3312]
