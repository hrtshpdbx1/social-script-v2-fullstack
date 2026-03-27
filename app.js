// -------------------
//       APP.JS
// -------------------

require('dotenv').config() // chargement des variables d'environnement 

const express = require('express'); //import d'express
const server = express(); //création du serveur express


// get sur localhost:3000
// Création d'une route de test (GET sur la racine)
server.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Bienvenue sur l'API de Social Script 🚀",
        status: "En ligne"
    });
});

// get sur localhost:3000/scenarios
server.get('/scenarios', (req, res) => {

    res.send({ message : 'Voici tous les scenarios'}, 200);
})

const router = require("./routes"); // on indique que notre serveur Express doit utiliser ce routeur
server.use('/api', router);


// Écouter le serveur sur un port spécifique
server.listen(3000, () => {
    console.log(`🚀 Serveur SocialScript démarré sur le port ${ 3000 }`);
})
