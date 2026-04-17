
const themeService = require('../services/theme.service')

const themeController = {

    /**
* Récupérer tous les Thèmes
* @param { Request } req
* @param { Response } res
* @param { NextFunction } next
*/

    // todo : vérifier utilité de cette fonctions
    getAllThemes: async (req, res, next) => {

        try {
            const allThemes = await themeService.find()
            const dataToSend = {
                themes: allThemes
            };
            // Si tout s'est bien passé, renvoie 200 et data
            res.status(200).json(dataToSend);
        } catch (err) {
            next(err); // Error Middleware de index.js 
        }

    },

    getThemeByDifficulty: async (req, res, next) => {
        try {
            const { difficultyId } = req.params;
            // On récupère le difficultyId depuis l'URL
            const filteredThemes = await themeService.findByDifficultyId(difficultyId);

            // on demande au themeService de trouver les thème associé à ce difficultyId 
            const dataToSend = {
                themes: filteredThemes
            };
            res.status(200).json(dataToSend);
            // on renvoit un tableau (vide ou plein)
        } catch (err) {
            next(err);
        }

    }, 

    insert: async (req, res, next) => {
        try {
            const themeToAdd = req.body;
            const newTheme = await themeService.create(themeToAdd);
            
            res.status(201).json({
                message: "Nouveau thème proposé avec succès. En attente de validation.",
                data: newTheme
            });
        } catch (err) {
            next(err);
        }
    }



}

module.exports = themeController