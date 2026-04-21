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
            // On crée un nouveau filtre qui combine l'ancien et la règle de soft delete
            const deletedScenarioFilter = { ...filter, deletedAt: null };
            const scenarios = await Scenario.find(deletedScenarioFilter).select(fields)
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
            // On utilise findOne pour pouvoir combiner l'ID et notre condition de soft delete
            const scenario = await Scenario.findOne({ 
                _id: id, 
                deletedAt: null 
            });
            return scenario;
        } catch (err) {
            console.log(err);
            throw err; 
        }
    },



    create: async (scenario) => {
        try {
            const scenarioToAdd = new Scenario({ ...scenario, 'status': 'pending' });
            // Créer un nouvel objet à partir du model, en forçant status: pending

            // Sauvegarde cet objet en DB 
            await scenarioToAdd.save();
            // Renvoyer l'objet créé
            return scenarioToAdd


        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    update: async (scenarioId, newScenarioStatus, adminId) => {
        try {
            const statusToUpdate = await Scenario.findByIdAndUpdate(scenarioId,
                {
                    ...newScenarioStatus,
                    reviewedBy: adminId,
                    reviewedAt: new Date()
                },
                { returnDocument: 'after' }
            );
            return statusToUpdate
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }

    },

    delete: async (id) => {
        try {
            // On cherche l'ID ET on s'assure qu'il n'est pas déjà supprimé
            const deletedScenario = await Scenario.findOneAndUpdate(
                { _id: id, deletedAt: null }, // Le filtre strict
                { deletedAt: new Date() },
                { returnDocument: 'after' } 
            );
            return deletedScenario;
            
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}


module.exports = scenarioService