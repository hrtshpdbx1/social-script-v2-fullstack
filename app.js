// -------------------
//       APP.JS
// -------------------

// ! 1) Importer express + Créer le serveur
const express = require('express'); //import d'express
const server = express(); //création du serveur express
const mongoose = require("mongoose"); // import mongoose


// ? Récupération des variables d'environnement :
const { PORT, DB_CONNECTION } = process.env;




// ? Pour paramétrer le fait que notre API doit comprendre quand du json arrive
server.use(express.json());

// ?  2/ Mongoose Middleware
//création Middleware qui ... Mongoose
//pour établir la connexion besoin d'importer Mongosse (cf plus haut ligne  require("mongoose");)
server.use(async (req, res, next) => {
    // a partir de cet objet nous pouvons essayer d'établir une connexion
    // ici on essaye de se connecter mais ça peut prendre du temps ou echouer donc la méthode pour se connecter nous envoie une promisse. Il faut donc utiliser then catch  soit le asyn await avec le try catch (plus propre)
    try {
        // on essaye de se connecter
        await mongoose.connect(DB_CONNECTION, { dbName: 'TaskManager' }); // Pouet = une URL bidon
        console.log("💾 Successfully log to the DB 🥳");
        next(); //si ça  fonctionné on continue la requète

    } catch (err) {
        // si ça  ne marche pas on écrit dans la consolole un mess d'erreur
        console.log(`🙅⛔Connection failed \n[Reason]\n ${err}`);
        res.status(500).json({ statusCode: 500, message: 'Impossible de connecter à la DB ☹️' })
    }
})


// ! 2) Traiter les requêtes
// ? indiquer a l'app ou le rooting se trouve

const router = require('./routes') // import de l'objet router qui se trouve dans le index.js 
server.use('/api', router); // indiquer à notre serveur qu'il doit utiliser le router

// ** OLD
// en get sur http://localhost:3000/
// server.get('/', (req, res) => {
//     res.send({message : 'C\'est tout bon'}, 200);

// }), 

// server.get('/scenarios', (req, res) =>
// res.send({message: 'Voici la liste des scenarios'}, 200))

// server.get('/users', (req, res) =>
//     res.send({ message: 'Voici la liste des utilisateur·ices' }, 200))



// ! 3) Écouter le serveur sur un port spécifique
server.listen(PORT, () => {
    console.log(`🚀 Serveur SocialScript démarré sur le port ${PORT}`);
})


// * dot.env --> Librarie pas aussi moderne que la fonctionnalité native de Node

// Plus tard
// ajouter app level middelware / du middleware CORS
// --> cf. demo ligne 18