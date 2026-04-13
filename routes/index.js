// ** Index.js
// Point d'entrée de toute nos routes aka Router General 
// Role : définition de toutes les routes de notre API (verb + url statique + params)

// import scenarios.router
const difficultyRouter = require('./difficulties.router');
const scenarioRouter = require('./scenarios.router');
const themeRouter = require('./themes.router')


// ! 1) Créer un objet "routeur" (router)
const router = require('express').Router();

// ! 2) Configurer les routes
// Donne accès 
// use permet d'indiquer que notre router de base doit utiliser, si l'url est localhost:3000/api/quelque_chose, le quelque_chose.routeur pour la suite

router.use('/scenarios', scenarioRouter)
router.use('/difficulties',difficultyRouter )
router.use('/difficulties/:difficultyId/themes', themeRouter)
// ⬆️ permet d'accéder aux scenarios associé à un thème, lui même associé à un niveau de difficulté
// Thème est imbriqué dans difficultés 
// ex d'URL pour accéder aux scénarios d'un thème
// http://localhost:3000/api/difficulties/:difficultyId/themes/:themeId/scenarios

// ! 3) Export du router 
module.exports = router;
