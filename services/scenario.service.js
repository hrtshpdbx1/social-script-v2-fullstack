// scenario.service.js

// ? Import du Model 
// schema Mongoose qui permet d'interagir avec la collection dans MongoDB.
const Scenario = require('../models/scenario.model');

const scenarioService = {
    // Fonction async pour trouver tous les scénarios dans la DB
    // import param filter
    find: async (filter, fields = null) => {
        // quand getAll appelle find(filter) sans deuxième argument, fields = null, Mongoose ignore .select(null) -> tout est retourné.
        try {
            const scenarios = await Scenario.find(filter).select(fields)
            // une fois les données récupérées, sont retournées au controller
            return scenarios;
        }

        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    findById: async (id) => {
        try {
            const scenario = await Scenario.findById(id)
            return scenario;
        } catch (err) {

            console.log(err);
            throw new Error(err);
        }
    },



    create: async (scenario) => {
        try {
            const scenarioToAdd = new Scenario({...scenario,'status': 'pending'});
            // Créer un nouvel objet à partir du model, en forçant status: pending
   
            // Sauvegarde cet objet en DB 
            await scenarioToAdd.save();
            // Renvoyer l'objet créé
            return scenarioToAdd


        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

}

module.exports = scenarioService