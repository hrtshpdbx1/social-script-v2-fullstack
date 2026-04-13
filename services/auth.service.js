// auth.service.js
const argon2 = require('argon2')
const User = require('../models/user.model')

const authService = {

    findByCredentials: async (credentials) => {

    },

    emailAlreadyExist : async(email) => {
        try {
            //on cherche l'utilisateur·ice dont l'email correspond à l'email reçu en params
            const userFound = await User.findOne({email});
            // si utilisateurice trouvé·e, oui l'email existe déjà
            if(userFound) {
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