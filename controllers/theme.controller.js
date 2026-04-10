
const themeService = require('../services/theme.service')

const themeController = {

    /**
* Récupérer toutes les scenarios
* @param { Request } req
* @param { Response } res
*/

    getAllThemes: async (req, res) => {

        try {
            const themes = await themeService.find()
            const dataToSend = {
                themes
            };
            // Si tout s'est bien passé, renvoie 200et data
            res.status(200).json(dataToSend);
        } catch (err) {

            res.status(500).json({ statusCode: 500, message: 'Erreur lors de la récupération des thèmes dans la DB' });
        }

    },

    getByDifficulty: async (req, res) => {
        // Si pas de theme récupéré (donc si l'id n'existe pas) l'API renvoie une erreur 404
        try {
            const id = req.params.difficultyId
            const theme = await themeService.findByDifficultyId(id);
            if (!theme) {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Pas de theme trouvé'
                })
            }
            else res.status(200).json(theme);
        }

        catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Une erreur est survenue lors de la récupération de la tâche' })
        }

    }




}

module.exports = themeController