import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"
const contenu = readFileSync("track.json", "utf-8")
console.log(contenu)
const test = JSON.parse(contenu)
console.log(test)
