// -------------------
//       APP.JS
// -------------------

// ? 1) Imports express et création du serveur
const express = require('express');
const server = express();
const mongoose = require("mongoose");

// ? Récupération des variables d'environnement :
// On récupère DB_CONNECTION
const { DB_CONNECTION } = process.env;

// On récupère le PORT fourni par Render, ou on utilise 3000 par défaut (pour ton PC local)
const PORT = process.env.PORT || 3000;

// ? 2) Configuration des middlewares globaux d'Express (en 1er toujours)

const cors = require('cors');
console.log("👉 Origine acceptée par le serveur :", process.env.CORS_ORIGIN);

server.use(cors({
  origin: [process.env.CORS_ORIGIN, 'http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


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

