// auth.controller.js
const authService = require("../services/auth.service");
const jwtUtils = require("../utils/jwt.utils");
const errorUtils = require('../utils/error.utils');

// 
const authController = {

    register: async (req, res, next) => {

        try {
            // On récupére le body de la requète qui contient les infos de l'utilisateur·ice
            const userToAdd = req.body;

            // On vérifie si l'email n'est pas déjà utilisé
            if (await authService.emailAlreadyExist(userToAdd.email)) {
                return next(errorUtils.create(409, 'Cet e-mail est déjà utilisé'));
            };

            //On tente d'ajouter l'utilisateur·ice
            const userCreated = await authService.create(userToAdd);

            res.location(`/api/user/${userCreated.id}`);
            // On séléctionne certaine info avant de renvoyer
            res.status(201).json({
                id: userCreated._id,
                firstname: userCreated.firstName,
                lastname: userCreated.lastName
            });
        }
        catch (err) {
            next(err);// -> Error Middleware de index.js 
        }
    },


    login: async (req, res, next) => {
        try {
            //récupération des infos de connexion envoyée dans le body
            const credentials = req.body;
            // essayer de trouver le user qui correspond à ces données
            const userFound = await authService.findByCredentials(credentials);

            // si pas de user trouvée, les infos de connextions ne sont pas bonnes
            if (!userFound) {
                return next(errorUtils.create(401, 'Les informations de connexion ne sont pas bonnes'));
            } else {
                // on génère un token
                const token = await jwtUtils.generate(userFound);

                // on renvoie quelques infos et le token
                res.status(200).json({
                    id: userFound._id,
                    firstName: userFound.firstName,
                    lastName: userFound.lastName,
                    token
                })
            }

        } catch (err) {
            next(err);
        }
    },

}

module.exports = authController