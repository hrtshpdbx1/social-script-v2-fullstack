// theme.service.js

const Theme = require('../models/theme.model')

const themeService = {
    // Fonction async pour trouver tous les themes dans la DB
    // avec un filter (par défaut un objet vide) et fields (optionnel)
   
    find: async(filter = {}, fields = null) => {
        try {
            // on passe le filtre à Mongoose
             //  si on appelle find() sans argument, Mongoose ramène tout. Si on passe un filtre, il filtre.
            const themes = await Theme.find(filter).select(fields);
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
            const themes = await Theme.find({ difficultyId: difficultyId })
            return themes;
        }
        catch (err) {

            console.log(err);
            throw new Error(err);
        }
    }, 

    findById: async (id) => {
        try {
            const theme = await Theme.findById(id);
            return theme;
        } catch (err) {
            throw err;
        }
    },

    create: async (theme) => {
        try {
            // On force le statut à pending par sécurité
            const themeToAdd = new Theme({ ...theme, status: 'pending' });
            await themeToAdd.save();
            return themeToAdd;
        } catch (err) {
            throw err;
        }
    },

    update: async (themeId, newInfos, adminId) => {
        try {
            const updatedTheme = await Theme.findByIdAndUpdate(
                themeId,
                {
                    ...newInfos,
                    reviewedBy: adminId,
                    reviewedAt: new Date()
                },
               { returnDocument: 'after' }
            );
            return updatedTheme;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = themeService