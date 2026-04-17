// ** Index.js
// Point d'entrée de toute nos routes aka Router General 
// Role : définition de toutes les routes de notre API (verb + url statique + params)

// import scenarios.router
const adminRouter = require('./admin.router');
const authRouter = require('./auth.router');
const difficultyRouter = require('./difficulties.router');
const scenarioRouter = require('./scenarios.router');
const themeRouter = require('./themes.router')


// ! 1) Créer un objet "routeur" (router)
const router = require('express').Router();

// ! 2) Configurer les routes
// Donne accès 
// use permet d'indiquer que notre router de base doit utiliser, si l'url est localhost:3000/api/quelque_chose, le quelque_chose.routeur pour la suite

router.use('/scenarios', scenarioRouter)
router.use('/difficulties', difficultyRouter)
router.use('/difficulties/:difficultyId/themes', themeRouter)
// ⬆️ permet d'accéder aux scenarios associé à un thème, lui même associé à un niveau de difficulté
// Thème est imbriqué dans difficultés 
// ex d'URL pour accéder aux scénarios d'un thème
// http://localhost:3000/api/difficulties/:difficultyId/themes/:themeId/scenarios
router.use('/auth', authRouter)
router.use('/admin', adminRouter)


// ! 3) Middlewares d'erreur
// 404 (Route non trouvée)
// Si la requête est arrivée jusqu'ici, c'est qu'elle n'a matché aucune route au-dessus.
router.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "La ressource demandée n'existe pas. Erreur de typo dans l'URL ?"
    });
});

//  Global handle (le reste, toujours à la fin)
router.use((err, req, res, next) => {
    console.error("🚨 [Error Middleware] :", err.message); // Journalisation
    // console.error(err.stack); // à decommenter pour détails

    // Déterminer le code de statut HTTP
    // Si l'erreur qu'on a interceptée possède déjà un code (ex: erreur Yup, erreur JWT), on le prend.
    // Sinon, on part du principe que c'est un crash de notre serveur (500).
    const statusCode = err.status || err.statusCode || 500;

    //  Déterminer le message à renvoyer au client
    const message = err.isOperational 
    ? err.message 
    : "Une erreur inattendue est survenue sur le serveur.";

    // 4. Envoyer UNE SEULE réponse formatée en JSON
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    });
});

// router.use((err, req, res, next) => {
//     console.log(err.stack); // Journalisation de l'erreur
//     res.status(400).send('Requête incorrecte, veuillez vérifier la saisie')
//     res.status(401).send(' Accès non autorisé!')
//     res.status(403).send('Accès interdit, vous n\'avez pas les droits')
//     res.status(404).send('La page n\'exite pas, erreur de typo dans l\'URL ?')
//      res.status(422).send('La requête est correction mais le serveur ne peut traiter la demande')
  
// });


// ! 3) Export du router 
module.exports = router;
