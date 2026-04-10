// scenarios.controller.js
// Chaque fonction représente une action qu'on peut faire sur la ressource.

// ? Import Service 
const scenarioService = require('../services/scenario.service')

const scenarioController = {

    /**
    * Récupérer toutes les scenarios
    * @param { Request } req
    * @param { Response } res
    */

    getAll: async (req, res) => {

        try {
            const scenarios = await scenarioService.find()
            const dataToSend = {
                scenarios
            };
            // Si tout s'est bien passé, renvoie 200et data
            res.status(200).json(dataToSend);
            } catch (err) {

            res.status(500).json({ statusCode: 500, message: 'Erreur lors de la récupération des scenarios dans la DB' });
        }
         
    },

    getById: (req, res) => {
        res.status(200).json({ message: `Voici le scenario n°${req.params.id}`, id: req.params.id });
    },

    // getByAuthor (req, res) => {
    // },


    insert: (req, res) => {
        const scenarioToInsert = req.body;
        res.status(201).json({ message: "Scénario reçu", data: scenarioToInsert });
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
