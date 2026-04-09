// scenarios.controller.js
// création de notre controller
// Chaque fonction représentera une action qu'on peut faire sur la ressource.

const scenarioController = {
    getAll: (req, res) => {
        res.sendStatus(200).send("Voici tous les scenarios");
    },
    getById: (req, res) => {
        res.sendStatus(200).send(`Voici le scenario n°${req.params.id}`);
    },

    // getByAuthor (req, res) => {
    // },


    insert: (req, res) => {
        const scenarioToInsert = req.body;
        res.sendStatus(200).send({ scenarioToInsert });
    },

    update: (req, res) => {
        res.sendStatus(501);
    },

    updateStatus: (req, res) => {
        res.sendStatus(501);
    },

    delete: (req, res) => {
        res.sendStatus(501);
    }

}

//on le rend importable en l'exportant
module.exports = scenarioController
