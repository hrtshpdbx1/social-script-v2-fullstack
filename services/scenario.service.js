// scenario.service.js

// ? Import du Model 
// schema Mongoose qui permet d'interagir avec la collection dans MongoDB.
const Scenario = require('../models/scenario.model');

const scenarioService = {
    // Fonction async pour trouver tous les scénarios dans la DB
    // import param filter
    find: async (filter) => { 
        try {
            const scenarios = await Scenario.find(filter)
            // une fois les données récupérées, retourn au controller
            return scenarios;
        }

        catch (err) {

            console.log(err);
            throw new Error(err);
        }
    }

}

module.exports = scenarioService