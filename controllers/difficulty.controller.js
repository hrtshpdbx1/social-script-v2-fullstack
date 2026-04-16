// difficulty.controller.js

const difficultyService = require('../services/difficulty.service')

const difficultyController = {
    getAllDifficulties: async (req, res, next) => {

        try {
            const allDifficulties = await difficultyService.find()
            const dataToSend = {
                difficulties: allDifficulties
            };
            // Si tout s'est bien passé, renvoie 200et data
            res.status(200).json(dataToSend);
        } catch (err) {
            next(err);// --> passe au  Middleware de index.js 
        }

    }

}

module.exports = difficultyController