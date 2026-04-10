// theme.service.js

const Theme = require('../models/theme.model')

const themeService = {
// Fonction async pour trouver tous les themes dans la DB
    find: async () => { 
        try {
            const themes = await Theme.find()
            // une fois les données récupérées, return au controller
            return themes;
        }

        catch (err) {

            console.log(err);
            throw new Error(err);
        }
    },

    findByDifficultyId: async (difficultyId) => {
        try {
            const themes = await Theme.find({difficultyId:difficultyId})
            return themes;
        }
         catch (err) {

            console.log(err);
            throw new Error(err);
        }
    }

}

module.exports = themeService