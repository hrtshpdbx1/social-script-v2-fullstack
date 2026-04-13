// auth.controller.js

const authService = require("../services/auth.service");

// 
const authController = {


    register: async (req, res) => {

        try {
            // On récupére le body de la requète qui contient les infos de l'utilisateur·ice
            const userToAdd = req.body;

            // On vérifie si l'email n'est pas déjà utilisé
            if (await authService.emailAlreadyExist(userToAdd.email)) {
                res.status(409).json({
                    statusCoe: 409,
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
            res.sendStatus(500);
        }

    },


    login: async (req, res) => {
        res.sendStatus(501);
    },

}

module.exports = authController