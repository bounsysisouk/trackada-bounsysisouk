import { homedir } from "os"
import { join } from "path"
import { existsSync, readFileSync } from "fs"
import readline from "readline"

 const assemblerAvecEt = (elements) => {
        if (elements.length === 1) {
            return elements[0]
        }
        const dernier = elements.pop()
        return elements.join(", ") + " et " + dernier
    }

//----------- CHARGEMENT---------- //
//1. Chemin du fichier track.json
const cheminJson = join(homedir(), "ada-tech", "bloc1", "projets", "trackada", "track.json")
if (existsSync(cheminJson)) {
    /* charger */
    const contenu = readFileSync(cheminJson, "utf-8")
    console.log(contenu);
    
    /* parser */
    const trackData = JSON.parse(contenu)
    console.log(trackData);
    
    /* Verifier si le dossier projets existe */
    const cheminProjets = join(homedir(), "ada-tech", "bloc1", "projets")
    if (existsSync(cheminProjets)) {
        console.log(`✅ le dossier projets existe: ${cheminProjets}`)
    } else {
        console.log(`❌ le dossier est introuvable : ${cheminProjets}`);
    }
    
//-------VERIFICATION DES PROJETS---------//
    /* Vérifier si les dossiers projets sont au bon endroit et correctement nommés */
    
   
    let projetsCorrects = 0
    const totalProjets = trackData.projects.length
    trackData.projects.forEach((projet) => {
        
        const erreurs = []
        //1. Constuire le chemin absolu du projet courant 
        const cheminProjet = join(cheminProjets, projet.name)
        //2. Vérifier si le dossier du projet existe
        if (!existsSync(cheminProjet)) {
            erreurs.push("le dossier n'existe pas ou n'est pas nommé corectement")
        } else {
            
            //3. Vérifier si le projet et un dépot git
            const cheminGit = join(cheminProjet, ".git")
            if (!existsSync(cheminGit)) {
                erreurs.push("le repository n'est pas initialisé")
            }
            
            //4. Verifier que chaque projet contient les fichiers requis
            const fichiersManquants = projet.required.filter((fichier) => {
                const cheminFichier = join(cheminProjet, fichier)
                return !existsSync(cheminFichier)
            })
            if (fichiersManquants.length > 0) {
                erreurs.push(` il manque ${assemblerAvecEt(fichiersManquants)}`)
            }
        }
        //5. Afficher le reusltats
        if (erreurs.length > 0) {
            /* Affichage des erreurs */ 
            console.log(`❌ dossier du projet ${projet.name}`)
            erreurs.forEach((erreur) => {
                console.log(`- ${erreur}`)
            })
        } else {
            console.log(`✅ dossier du projet ${projet.name}`)
            projetsCorrects++
        }
        //6. POURCENTAGE 
        const pourcentage = Math.round((projetsCorrects / totalProjets) * 100)
        console.log(pourcentage)
        console.log("")
    })
} else {   
    console.log(`❌ le Fichier track.json introuvable : ${cheminJson}`)
}


// POSER UNE QUESTION A L'UTILISATEUR //

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
})
rl.question("Voulez vous commencer la vérification ? (y/n)", (reponse) => {
  if (reponse.trim().toLowerCase() === "y") {
      
    console.log("Vérification en cours...")
    /* Lancer la verification  y(yes) or n(no) */
  } else {
    console.log("Annulé.")
  } 
  rl.close()
})