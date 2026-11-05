# 🚀 TrackADA — Vérificateur de projets
## 📰 1. Présentation du projet
 TrackADA est un script Node.js permettant de vérifier automatiquement l’organisation et la présence des éléments nécessaires dans les projets du dossier ada-tech.
Il permet de contrôler rapidement si les projets sont correctement installés et si leur structure correspond aux exigences définies dans un fichier de configuration track.json.
Le script effectue plusieurs contrôles :
* Vérification de la présence du fichier track.json.
* Chargement et lecture des données JSON.
* Vérification de l’existence du dossier principal projets.
* Vérification de la présence de chaque dossier de projet.
* Vérification de l’initialisation d’un dépôt Git.
* Vérification de la présence des fichiers et dossiers requis.
* Affichage des erreurs détectées.
* Calcul du pourcentage de projets correctement initialisés.
## ⚙️ 2. Prérequis
Avant d’utiliser TrackADA, vous devez disposer des éléments suivants :
* Un ordinateur sous macOS, Linux ou Windows.
* Node.js installé.
* Un terminal (Terminal sur macOS, PowerShell ou autre).
* Un dossier ada-tech contenant les projets à vérifier.
* Un fichier track.json correctement renseigné.
Aucune dépendance externe n’est nécessaire : le script utilise uniquement les modules natifs de Node.js.
## 🗂️ 3. Organisation des dossiers
Le script utilise une arborescence précise :
~/ada-tech/
│
└── bloc1/
    │
    └── projets/
        │
        ├── trackada/
        │   └── track.json
        │
        ├── adalgo/
        │   ├── .git/
        │   ├── exo-1/
        │   └── exos-2/
        │
        ├── adataviz/
        │   ├── .git/
        │   └── index.js
        │
        └── ...
*Important* : le script recherche actuellement le fichier track.json dans :
~/ada-tech/bloc1/projets/trackada/track.json
Les dossiers des projets sont recherchés dans :
~/ada-tech/bloc1/projets/
Le symbole ~ correspond au répertoire personnel de l’utilisateur.
## 🛠️ 4. Configuration du fichier track.json
Le fichier track.json contient la liste des projets à contrôler ainsi que les éléments obligatoires pour chacun d’entre eux.
Exemple de configuration
{
  "projects": [
    {
      "name": "adalgo",
      "required": [
        "exo-1",
        "exos-2",
        "node_modules/vitest"
      ]
    },
    {
      "name": "adataviz",
      "required": [
        "index.js"
      ]
    },
    {
      "name": "adatabase",
      "required": [
        "index.js",
        "README.md"
      ]
    }
  ]
}
Explication des propriétés
Propriété	Description
projects	Tableau contenant les projets à vérifier.
name	Nom exact du dossier du projet.
required	Tableau des fichiers et dossiers obligatoires.
Attention :
* Le nom du projet doit correspondre exactement au nom de son dossier.
* Les chemins des éléments requis sont relatifs au dossier du projet.
* Chaque élément de required doit être renseigné sous forme de chaîne de caractères.
* Le fichier doit respecter la syntaxe JSON.
## 📲 5. Installation et lancement
### Étape 1 — Vérifier Node.js
Ouvrez un terminal et exécutez :
node -v
Si une version de Node.js s’affiche, l’installation est disponible.
### Étape 2 — Se placer dans le dossier du script
Dans le terminal :
cd chemin/vers/trackada
Remplacez le chemin par l’emplacement réel du script.
### Étape 3 — Vérifier la configuration JavaScript
Le script utilise la syntaxe des modules ES Modules (import).
Vous pouvez utiliser une extension .mjs ou configurer votre package.json avec :
{
  "type": "module"
}
### Étape 4 — Lancer le script
Si votre fichier s’appelle trackada.js :
node trackada.js
Le programme demande alors une confirmation avant de commencer.
## 💻 6. Utilisation du programme
Au démarrage, le programme affiche la question :
Voulez-vous commencer la vérification ? (y/n)
Deux réponses sont possibles :
* y : lance les vérifications.
* n : annule l’opération.
La réponse n’est pas sensible à la casse : Y et N sont également acceptés.
## 📈 7. Comprendre les résultats
### Pour chaque projet, le programme affiche son état.
Projet avec des erreurs
❌ dossier du projet adalgo

- le repository git n'est pas initialisé
- il manque exo-1, exos-2 et node_modules/vitest
Cela signifie que le dossier existe, mais que certains éléments obligatoires sont absents.
Projet correctement initialisé
✅ dossier du projet adalgo
Cela signifie que les contrôles effectués sur ce projet n’ont détecté aucune erreur.
Projet introuvable
❌ dossier du projet adatabase

- le dossier n'existe pas ou n'est pas nommé correctement
Cela signifie que le dossier correspondant au nom déclaré dans track.json n’a pas été trouvé.
Résultat global
À la fin de la vérification, le programme affiche un bilan :
❌ 16% des projets sont initialisés correctement (2/12)
Le pourcentage est calculé à partir du nombre de projets sans erreur par rapport au nombre total de projets déclarés dans track.json.
Formule utilisée :
(projetsCorrects / totalProjets) × 100
Le résultat est arrondi à l’entier le plus proche.
## 🔍 8. Que vérifie réellement TrackADA ?
Contrôle	Description
Fichier JSON	Vérifie que track.json existe.
Dossier principal	Vérifie que le dossier projets existe.
Dossier du projet	Vérifie que chaque dossier déclaré existe.
Dépôt Git	Vérifie la présence du dossier .git.
Fichiers requis	Vérifie la présence des éléments déclarés dans required.
Pourcentage	Calcule le taux de projets sans erreur.
Limites actuelles :
TrackADA vérifie la présence des éléments, mais ne vérifie pas :
* La validité ou le bon fonctionnement du code des projets.
* L’état réel du dépôt Git (commits, branche ou synchronisation distante).
* Le contenu des fichiers.
* La validité des dépendances installées.
* La qualité ou la conformité du code source.
La présence d’un dossier .git ne garantit donc pas que le dépôt Git fonctionne correctement.
## 🪠 9. Dépannage
Le fichier track.json est introuvable
Vérifiez que le fichier est bien situé dans :
~/ada-tech/bloc1/projets/trackada/track.json
Vérifiez également son nom et son extension.
Un projet est signalé comme introuvable
Vérifiez :
* Le nom déclaré dans track.json.
* Le nom réel du dossier.
* L’emplacement du dossier dans projets.
Un fichier obligatoire est manquant
Vérifiez que le fichier ou le dossier existe à l’emplacement indiqué dans required.
Erreur de lecture du JSON
Vérifiez que le fichier respecte la syntaxe JSON : guillemets doubles, virgules et accolades correctement placées.
## 🤖 10. Technologies utilisées
* JavaScript : langage de programmation.
* Node.js : environnement d’exécution JavaScript.
* File System (fs) : lecture des fichiers et vérification de leur existence.
* Path (path) : construction des chemins de fichiers.
* OS (os) : récupération du répertoire personnel.
* Readline (readline) : interaction avec l’utilisateur dans le terminal.
## 🏁 11. Conclusion
TrackADA est un outil de vérification destiné à faciliter le suivi et le contrôle de l’organisation des projets du Bloc 1.
Il permet de détecter rapidement les dossiers absents, les dépôts Git non initialisés et les fichiers obligatoires manquants.
Son objectif est de simplifier le contrôle des projets et de fournir une vision globale de leur niveau d’initialisation.