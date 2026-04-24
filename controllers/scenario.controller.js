// scenario.controller.js
// Chaque fonction représente une action qu'on peut faire sur la ressource.

// ? Import 
const scenarioService = require('../services/scenario.service');
const errorUtils = require('../utils/error.utils');
const scenarioController = {

    /**
    * Récupérer tous les scenarios
    * @param { Request } req
    * @param { Response } res
    *  @param { Function } next
    */

    getAll: async (req, res, next) => {
        try {
            //  On extrait uniquement les paramètres autorisés depuis req.query
            const { difficultyId, themeId } = req.query;

            // Création d'un objet de filtre dynamique
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
            next(err)
        }
    },

    /**
        * Récupérer tous les scenarios par id
        * sera utilisé par les admins/modérateurs pour consulter les scénarios et les valider, les rejeter, les modifier.*
        * @param { Request } req
        * @param { Response } res
        * @param { Function } next
        */

    getById: async (req, res, next) => {

        try {
            const scenarioId = req.params.id
            const scenario = await scenarioService.findById(scenarioId)
            const dataToSend = { scenario }
            if (!scenario) {
                return next(errorUtils.notFound('L\'id ne correspond à aucun scenario'))
            } else { res.status(200).json(dataToSend) }

        } catch (err) {
            next(err)
        }

    },

    /**
        * getByThemeId
        * ----------------------------------------------------
        * Permet aux les utilisateur·ices de récupérer tous les scenarios (approuvés) en fonction de leur themeID
        * @param { Request } req
        * @param { Response } res
        *  @param { Function } next
        */

    //  Version légère, "liste" --> on renvoit Title et context seulement
    getByThemeId: async (req, res, next) => {
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
            next(err)
        }
    },

    getByUser: async (req, res, next) => {
        try {
            const userId = req.params.id
            const scenarios = await scenarioService.find({ authorId: userId });
            const dataToSend = { scenarios }
            res.status(200).json(dataToSend);
        } catch (err) {

            next(err)
        }
    },

    /**
    * Ajouter un scénario
    * @param { Request } req
    * @param { Response } res
    *  @param { Function } next
    */

    insert: async (req, res, next) => {
        try {
            const scenarioData = req.body;
            const authorId = req.user.id;

            // On fusionne les données du body avec l'ID de l'auteur
            const scenarioToCreate = {
                ...scenarioData,
                authorId: authorId
            };

            // On appelle le service pour sauvegarder dans MongoDB 
            const addedScenario = await scenarioService.create(scenarioToCreate);

            // Pour respecter les principes REST, on doit rajouter à la réponse, une url qui permet de consulter la valeur ajoutée
           res.location(`/api/scenario/${addedScenario._id}`);
            res.status(201).json({
                message: `Scénario de ${authorId} bien sauvegardé en base de données`,
                data: addedScenario
            });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = scenarioController
