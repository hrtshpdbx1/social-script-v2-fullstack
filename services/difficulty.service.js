// difficulty.service.js

const Difficulty = require('../models/difficulty.model')

const difficultyService = {
     // Fonction async pour trouver tous les difficultés dans la DB
    find: async () => { 
        try {
            const difficulties = await Difficulty.find()
            // une fois les données récupérées, retourn au controller
            return difficulties;
        }

        catch (err) {

            console.log(err);
            throw new Error(err);
        }
    }

}

module.exports = difficultyService