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
query ($name: String, $regex: String = "", $offset: Int = 0){
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
query ($name: String, $regex: String = "", $offset: Int = 0) {
progress(
    where: {path: {_regex: $regex}, isDone: {_eq: true}, user: {login: {_eq: $name}}}
    offset: $offset
    order_by: {updatedAt: asc}
  ) {
    object {
      id
      name
    }
  }
}
`

export const amountQuery = `
query($name: String, $offset: Int = 0, $ids: [Int]) {
  transaction(
    where: { object: { id: { _in: $ids } }, user: { login: { _eq: $name } }, type: { _eq: "xp" } }
    offset: $offset
    order_by: { createdAt: desc, amount: desc_nulls_last }
  ) {
    amount
    objectId
    createdAt
  }
}
`

export const auditQuery = `
query ($offset: Int = 0, $name: String = "") {
  transaction(
    where: {type: {_in: ["up", "down"]}, user: {login: {_eq: $name}}}
    offset: $offset
    order_by: {createdAt: desc_nulls_last}
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
query ($offset: Int = 0){
  user(
    where: {progresses: {campus: {_eq: "johvi"}, 
    isDone: {_eq: true}, 
    path: {_regex: "/johvi/div-01(/[0-9a-z-]*)?$"}}},
    offset: $offset, 
    order_by: {transactions_aggregate: {sum: {amount: desc}}}
  ) {
    login
  }
}
`

export const RUST_IDS = [100978, 3312]

export const div01Regex = "\/johvi\/div-01(\/[0-9a-z-]*)?$"

export const batch01 = [
  "AaEnnDeeErrEeEss",
  "mg",
  "pp",
  "Keskyla",
  "Neeoo",
  "anna_lazarenkova",
  "nimi25820",
  "SilverL",
  "CitaZane",
  "roosarula",
  "itskris",
  "georgi.suikanen",
  "Olaroll",
  "Artemy",
  "Jacob",
  "Rasmushytt",
  "AS",
  "Val_Khar",
  "Kanguste",
  "vic86",
  "leonard",
  "kris",
  "saulitis",
  "3mil",
  "specest",
  "tammiktanar",
  "Laura-Eliise",
  "gukka",
  "peenu",
  "silverpedak",
  "madismeer",
  "ErikH",
  "kaarelk",
  "Kazut61311334",
  "kerlz",
  "tallestbassist",
  "Zewas",
  "Katlink",
  "mercey123",
  "oto-tuul",
  "erkki.tikk",
  "thinkpad",
  "papshmeare",
  "hanno_remmelg",
  "taneln",
  "kasparp",
  "jrms",
  "Rostislav",
  "Rhynes",
  "KeitiN",
  "dfreshdawg",
  "paavel_makarenko",
  "urist",
  "kaspars",
  "Hougan",
  "liki123",
  "rahela",
  "marzahh",
  "inquisitivetable",
  "Kaire",
  "KalvarS",
  "Mihkelle",
  "harlet",
  "Chalengo",
  "mpower",
  "sten9911",
  "Chillius",
  "Moon",
  "maximihajlov",
  "jaaguplasn",
  "Jollyroger",
  "mtoom3000",
  "TaaviR",
  "Markuss",
  "Tatiana",
  "saare",
  "Zaur",
  "klukin",
  "Nadia",
  "hr.tauno",
  "EmilSokk",
  "SanderAulIT",
  "Ime",
  "santeri",
  "friedballerina",
  "TSeppern",
  "OliverPohlak",
  "myurry",
  "austraalane",
  "volkan",
  "mannakass",
  "Catharin",
  "lauriraus",
  "msih",
  "arturkraak",
  "123.45",
  "mihkeln",
  "Raigo",
  "juno",
  "Markus",
  "raidoxd",
  "freddyfrets",
  "kauri",
  "Melly",
  "Tiitus",
  "sagaryadav",
  "ARI",
  "kyrander",
  "Slabij",
  "Stewedsheep",
  "kindlus",
  "BlackPike",
  "sariyya",
  "Barbarapyss",
  "Rene__",
  "xbanana24",
  "asdfguy",
  "Gahatun",
  "GertIndrek",
  "KristjanL",
  "mikkoad",
  "MihhailNikolajneko",
  "the_ninnas",
  "martkek",
  "TatjanaRo",
  "Nelosepo",
  "Priisalm",
  "Andro01",
  "kadriirdak",
  "Pihtje",
  "Aleksandr",
  "SiimonHyarm",
  "robert.davtjan",
  "river",
  "ET1991",
  "JO",
  "ingry321",
  "SergeiK",
  "novicer",
  "Tainapea34",
  "eltadeo",
  "Natali",
  "AivarH",
  "dzhkaeffi",
  "Serily",
  "aertonchristasa",
  "RihoRoomet",
  "Jxie",
  "ML",
  "DGansen",
  "kert_kompus",
  "Kristjan4111",
  "samoletik",
  "Denis",
  "haihoang",
  "eche.osigwe",
  "Godville",
  "agnespitka",
  "robinln",
  "Jakobson",
  "Lauri",
  "simone",
  "Voolaid",
  "AmrKharaba",
  "KPaloots",
  "Adeola",
  "JanKiv"
]