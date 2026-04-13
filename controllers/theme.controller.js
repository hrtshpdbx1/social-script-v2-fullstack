
const themeService = require('../services/theme.service')

const themeController = {

    /**
* Récupérer tous les hhèmes
* @param { Request } req
* @param { Response } res
*/

    getAllThemes: async (req, res) => {
// todo : vérifier utilité de cette fonctions
        try {
            const allThemes = await themeService.find()
            const dataToSend = {
                themes: allThemes
            };
            // Si tout s'est bien passé, renvoie 200 et data
            res.status(200).json(dataToSend);
        } catch (err) {

            res.status(500).json({ statusCode: 500, message: 'Erreur lors de la récupération des thèmes dans la DB' });
        }

    },

    getThemeByDifficulty: async (req, res) => {
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
            res.status(500).json({ statusCode: 500, message: 'Une erreur est survenue lors de la récupération du thème' })
        }

    }



}

module.exports = themeController