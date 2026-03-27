// Rappel cours : 📁 routes : définition de toutes les routes de notre API (verb + url statique + params)
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de Social Script", 200)
});

module.exports = router;
