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
// ? Pour que l'API comprenne quand du JSON arrive dans le body de la requête
server.use(express.json());


// ? 3) Branchement des routes
const router = require('./routes') // indique où le routing se trouve
server.use('/api', router); // indiquer à notre serveur qu'il doit utiliser le router

// ? 4) Connexion à MongoDB PUIS démarrage du serveur

async function startServer() {
    try {
        await mongoose.connect(DB_CONNECTION, { dbName: 'social_script' });
        server.listen(PORT, () => {
            console.log(`MongoDB : 🚀 SocialScript Server connected on the port ${PORT}`);
        })

    } catch (err) {
        console.log(`MongoDB : 🙅⛔Connection failed \n[Reason]\n ${err}`);
        process.exit(1)
    }
}
startServer();




// * dot.env --> Librarie pas aussi moderne que la fonctionnalité native de Node

const cors = require('cors');

server.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));