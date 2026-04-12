// scenario.controller.js
// Chaque fonction représente une action qu'on peut faire sur la ressource.

// ? Import Service 
const scenarioService = require('../services/scenario.service');
const { getByDifficulty } = require('./theme.controller');

const scenarioController = {

    /**
    * Récupérer toutes les scenarios
    * @param { Request } req
    * @param { Response } res
    */

    getAll: async (req, res) => {

        try {
            //  On extrait uniquement les paramètres autorisés depuis req.query
            const { difficultyId, themeId } = req.query;

            // 2. On construit un objet de filtre dynamique
            const filter = {};

            //  n'ajoute les clés que si elles existent
            if (difficultyId) {
                filter.difficultyId = difficultyId;
            }
            if (themeId) {
                filter.themeId = themeId;
            }

            // Si filter est vide {}, remonte tout (GET /scenarios)
            // S'il contient des clés, filtre (ex: GET /scenarios?themeId=456)
            const scenarios = await scenarioService.find(filter);

            const dataToSend = {
                scenarios
            };

            // Si tout s'est bien passé, renvoie 200 et data
            res.status(200).json(dataToSend);

        } catch (err) {
            console.error(err);
            res.status(500).json({
                statusCode: 500,
                message: 'Erreur lors de la récupération des scenarios dans la DB'
            });
        }
    },

    getById: (req, res) => {
        res.status(200).json({ message: `Voici le scenario n°${req.params.id}`, id: req.params.id });
    },

    getByThemeId: async (req, res) => {
        try {
            const themeId = req.params.themeId
            const theme = await scenarioService.find(
                { themeId, status: 'approved' },
            'title context'
        )
            if (!theme) {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Pas de theme trouvé'
                })
            }
            else res.status(200).json(theme);
        }

        catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Une erreur est survenue lors de la récupération du thème' })
        }
    },


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

module.exports = scenarioController
