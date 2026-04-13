// scenario.controller.js
// Chaque fonction représente une action qu'on peut faire sur la ressource.

// ? Import Service 
const scenarioService = require('../services/scenario.service');

const scenarioController = {

    /**
    * Récupérer tous les scenarios
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
            const allScenarios = await scenarioService.find(filter);

            const dataToSend = {
                scenarios: allScenarios
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

    /**
        * Récupérer tous les scenarios par id
        * sera utilisé par les admins/modérateurs pour consulter les scénarios et les valider, les rejeter, les modifier.*
        * @param { Request } req
        * @param { Response } res
        */

    getById: async (req, res) => {

        try {
            const scenarioId = req.params.id
            const scenario = await scenarioService.findById(scenarioId)
            const dataToSend = { scenario }
            if (!scenario) {
                res.status(404).json({ message: "L'Id ne correspond à aucun scenario" })
            } else { res.status(200).json(dataToSend) }

        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Une erreur est survenue lors de la récupération des scenarios' })
        }

    },

   
    /**
        * getByThemeId
        * ----------------------------------------------------
        * Permet aux les utilisateur·ices de récupérer tous les scenarios (approuvés) en fonction de leur themeID
        * @param { Request } req
        * @param { Response } res
        */



    //  Version légère, "liste" --> on renvoit Title et context seulement
    getByThemeId: async (req, res) => {
        try {
            const themeId = req.params.themeId // On récupère le themeId depuis l'URL
            const scenarios = await scenarioService.find(
                { themeId, status: 'approved' },
                'title context')
            // on demande au service de trouver les scenarios qui ont ce themeId
            // on filtre pour n'avoir que ceux qui sont approuvés
            //  si aucun scénario ne correspond, Mongoose renvoit un tableau vide [], donc prédicat de taille 
            // sinon, on renvoit title et context

            const dataToSend = { scenarios }
            res.status(200).json(dataToSend);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Une erreur est survenue lors de la récupération des scenarios' })
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
