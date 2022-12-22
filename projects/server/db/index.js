import fs from "fs"

export const readDB = () => {
  const dbFile = fs.readFileSync(`${process.cwd()}/db/db.json`).toString()
  const dbObject = JSON.parse(dbFile)

  return dbObject
}

export const writeDB = (data) => {
  const newDBObject = JSON.stringify(data)

  fs.writeFileSync(`${process.cwd()}/db/db.json`, newDBObject)
}
