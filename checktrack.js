import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"

//----------- CHARGEMENT---------- //

    /* charger */
const contenu = readFileSync("track.json", "utf-8")
console.log(contenu)

    /* parser */
const test = JSON.parse(contenu) 
console.log(test)

    /* Verifier si le dossier Projet existe */ 
const cheminProjets = join(homedir(), "ada-tech", "Bloc1", "projets")

    if (existsSync(cheminProjets)) {
        console.log(`✅ le dossier projets existe: ${cheminProjets}`);
    } else {
        console.log(`❌ le dossier est introuvable: ${cheminProjets}`);
    } 

//-------VERIFICATION DES PROJETS---------//

    /* Verifier si les dossiers projets sont au bon endroit et correctement nommés */git