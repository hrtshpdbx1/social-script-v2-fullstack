// ** Index.js
// Point d'entrée de toute nos routes aka Router General 
// Role : définition de toutes les routes de notre API (verb + url statique + params)

const scenarioRouter = require('./scenarios.router');


// ! 1) Créer un objet "routeur" (router)
const router = require('express').Router();


// ! 2) Configurer les routes
// permet d'indiquer que notre router de base doit utiliser, si l'url est localhost:3000/api/quelque_chose, le quelque_chose routeur pour la suite

router.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de Social Script", 200)
});

//TODO : les fonction req, res iront ensuite dans les dossiers controller, car les fichiers de toute ne doivent contenir que les méthodes des controllers à excuter quand on rencontre telle ou telle route 

router.use('/scenarios', scenarioRouter)


// ! 3) Export du router 
module.exports = router;
