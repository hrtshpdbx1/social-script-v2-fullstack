// difficulty.controller.js

const difficultyService = require('../services/difficulty.service')

const difficultyController = {
getAllDifficulties: async (req, res) => {

        try {
            const difficulties = await difficultyService.find()
            const dataToSend = {
                difficulties
            };
            // Si tout s'est bien passé, renvoie 200et data
            res.status(200).json(dataToSend);
            } catch (err) {

            res.status(500).json({ statusCode: 500, message: 'Erreur lors de la récupération des niveaux de difficultés dans la DB' });
        }
         
    }

}

module.exports = difficultyController