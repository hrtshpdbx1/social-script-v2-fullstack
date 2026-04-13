// auth.controller.js

const authService = require("../services/auth.service");
const jwtUtils = require("../utils/jwt.utils");

// 
const authController = {


    register: async (req, res) => {

        try {
            // On récupére le body de la requète qui contient les infos de l'utilisateur·ice
            const userToAdd = req.body;

            // On vérifie si l'email n'est pas déjà utilisé
            if (await authService.emailAlreadyExist(userToAdd.email)) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Cet e-mail est déjà utilisé'
                })
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
            console.log(err);
            res.sendStatus(500)
        }
    },


    login: async (req, res) => {
        try {
            //récupération des infos de connexion envoyée dans le body
            const credentials = req.body;
            // essayer de trouver le user qui correspond à ces données
            const userFound = await authService.findByCredentials(credentials);

            // si pas de user trouvée, les infos de connextions ne sont pas bonnes
            if (!userFound) {
               return res.status(401).json({ statusCode: 401, message: 'Les informations de connexion ne sont pas bonnes' });
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
            console.log(err);
            res.sendStatus(500)
        }
    },

}

module.exports = authController