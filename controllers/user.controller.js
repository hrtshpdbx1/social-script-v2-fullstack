// controllers/user.controller.js
const userService = require('../services/user.service');
const errorUtils = require('../utils/error.utils');

const userController = {
    // GET /users/me — renvoie le profil de l'utilisateur connecté
    getMe: async (req, res, next) => {
        try {
            // req.user a été posé par requireAuth ; on en extrait l'_id
            const userId = req.user._id; // user ne peut donc accéder qu'à son propre profil
            const user = await userService.findById(userId);

            if (!user) {
                // Le token est valide mais le user a été supprimé entre-temps
                return next(errorUtils.notFound());
            }

            return res.status(200).json({ user });
        } catch (err) {
            return next(err);
        }
    }
};

module.exports = userController;

