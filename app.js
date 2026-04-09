// -------------------
//       APP.JS
// -------------------

// ? 1) Imports express et création du serveur
const express = require('express');
const server = express();
const mongoose = require("mongoose");

// ? Récupération des variables d'environnement :
const { PORT, DB_CONNECTION } = process.env;

// ? 2) Configuration des middlewares globaux d'Express
// ? Pour que l(API comprennnr quand du json arrive
server.use(express.json());


// ? 3) Branchement des routes
const router = require('./routes') // indiquer où le rooting se trouve
server.use('/api', router); // indiquer à notre serveur qu'il doit utiliser le router

// ? 4) Connexion à MongoDB PUIS démarrage du serveur

async function startServer() {
    try {
        await mongoose.connect(DB_CONNECTION, { dbName: 'social_script' });
        server.listen(PORT, () => {
            console.log(`🚀 Serveur SocialScript connected to MongoDB on the port ${PORT}`);
        })

    } catch (err) {
        console.log(`🙅⛔Connection failed \n[Reason]\n ${err}`);
        process.exit(1)
    }
}
startServer();




// * dot.env --> Librarie pas aussi moderne que la fonctionnalité native de Node

// Plus tard
// ajouter app level middelware / du middleware CORS
// --> cf. demo ligne 18