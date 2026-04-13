// auth.service.js
const argon2 = require('argon2')
const User = require('../models/user.model')

const authService = {

    findByCredentials: async (credentials) => {
        try {
            //Trouver l'utilisateur dont le mail est égal à celui reçu, si pas d'utilisateur trouvé, on sort
            const userFound = await User.findOne({ email: credentials.email });

            if (!userFound) {
                return undefined;
            }

            //Si utilisateur trouvé, on va vérifier si le pwd qu'il a entré correspond à celui hashé dans la db
            const checkPassword = await argon2.verify(userFound.password, credentials.password);
            // Si pas, on sort
            if (!checkPassword) {
                return undefined;
            }
            else {
                // Si oui, c'est qu'on a le bon mail et le bon pwd, donc on peut renvoie l'utilisateur
                return userFound;
            }

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },


    emailAlreadyExist: async (email) => {
        try {
            //on cherche l'utilisateur·ice dont l'email correspond à l'email reçu en params
            const userFound = await User.findOne({ email });
            // si utilisateurice trouvé·e, oui l'email existe déjà
            if (userFound) {
                return true;
            }
            // sinon non
            else {
                return false
            }

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create: async (user) => {


        try {
            // ? Hasher et modifier le mdp de l'utilisateur·ice pour ajouter la version hashée en DB
            const hashedPassword = await argon2.hash(user.password);
            // on remplace le mdp en clair avec la donnée hashée
            user.password = hashedPassword;

            // remplace le mdp du user avec la version hashé
            // pour ça, on utilise notre modele de User
            const userToCreate = User(user);
            await userToCreate.save(); // on sauvegarde ds la BD

            //si ça c'est pas bien passé
            return userToCreate
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }


    },



}

module.exports = authService;