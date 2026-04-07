// scenario.router.js
 const scenarioRouter = require('express').Router();


 scenarioRouter.get('/', (req,res) => {
    res.send("Voici tous les scenarios", 200)
 })

 // Segment dynamique
 scenarioRouter.get('/:id', (req, res) => {
    const id = req.params.id;
     res.send(`Voici le scenario n°${id}`, 200)
 })
 scenarioRouter.post('/', (req, res) => {
    res.send("Scenario ajouté avec succès", 200)
 })

 module.exports = scenarioRouter