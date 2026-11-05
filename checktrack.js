import { homedir } from "os"
import { join } from "path"
import { existsSync, readFileSync } from "fs"
import readline from "readline"

// ASSEMBLAGE DES ELEMENTS 
const assemblerAvecEt = (elements) => {
        if (elements.length === 1) {
            return elements[0]
        }
        const dernier = elements.pop()
        return elements.join(", ") + " et " + dernier
    }

// COULEUR DES TEXTES
const green = (str) => {
    return "\x1b[32m" + str + "\x1b[0m";
}
const red = (str) => {
    return "\x1b[31m" + str + "\x1b[0m";
}
const yellow =(str) => {
    return "\x1b[33m" + str + "\x1b[0m";
} 

// DEBUT DE LA FONCTION
const verifierProjet = () => {
        //----------- CHARGEMENT-----------//
            /* Chemin du fichier track.json */
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
                console.log(green(`✅ le dossier projets existe: ${cheminProjets}`))
            } else {
                console.log(red(`❌ le dossier est introuvable : ${cheminProjets}`));
                return
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
                    console.log(red(`❌ dossier du projet ${projet.name}`))
                    erreurs.forEach((erreur) => {
                        console.log(`- ${erreur}`)
                    })
                } else {
                    console.log(green(`✅ dossier du projet ${projet.name}`))
                    projetsCorrects++
                }
                console.log("")
            })
                //------POURCENTAGE DE FICHIER CORRECT------// 
                const pourcentage = Math.round((projetsCorrects / totalProjets) * 100)
                console.log(yellow(`📊 ${pourcentage}% des projets sont initialisés correctement (${projetsCorrects}/${totalProjets})`))
        } else {   
            console.log(red(`❌ le Fichier track.json introuvable : ${cheminJson}`))
            return
        }
    }
      
        

// POSER UNE QUESTION A L'UTILISATEUR S'IL VEUT COMMENCER LA VERIF//
const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
})
rl.question("Voulez vous commencer la vérification ? (y/n)", (reponse) => {
  if (reponse.trim().toLowerCase() === "y") {
      /* Lancer la verification  y(yes) or n(no) */
      console.log("Vérification en cours...")
      verifierProjet()
  } else {
    console.log("Annulé.")
  } 
  rl.close()
})