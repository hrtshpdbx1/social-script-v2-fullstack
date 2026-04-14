// userAuthorization.middleware.js
// Permet de vérifier si dans le token, l'id de l'utilisateur·ice lui permet de faire ce qu'il/elle demande

// pourra être utiliser si on fait un user/GetById, par exemple pour afficher notre profil (et pas celui d'un autre) et nos scénarios proposés
const User = require('../../models/user.model');

const userAuthorization = () => {

    return async (req, res, next) => {
        // vérifier si l'id du token stocké dans la requête est identique à l'id dans la route de la requête 
        //? 1) Récupérer l'id se trouvant dans la route
        const userRouterId = req.params.id;
        console.log("userRouterId " + userRouterId);

        // ? 2) Récupérer l'id se trouvant dans le token et qui a été rajouté à la requète
        const userId = req.user.id; //récupéré dans auth.m.js
        console.log("userId " + userId);

        // ? 3) Récupérer le rôle de l'utilisateur·ices qui fait le requète car s'il est admin, il a le droit
        // On fait une requête vers la DB pour connaitre son rôle à cet instant précis 
        try {
            const tokenUser = await User.findById(userId)
            // si on a pas récupé d'utilisateur, c'est que la personne qui a fait la requête a été supprimée de la DB entre temps
            if (!tokenUser) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Utilisateur·ice introuvable dans la DB'
                });
            }
            // Vérification Admin OU Propriétaire du compte
            const isAdmin = tokenUser.role === 'admin';
            const isOwner = userId.toString() === userRouterId.toString();

            if (isAdmin || isOwner) {
                return next();
            }
            // Si on arrive ici, c'est que ni l'un ni l'autre n'est vrai
            return res.status(403).json({
                statusCode: 403,
                message: 'Vous n\'avez pas les droits d\'accès à ces données'
            });
            // sinon, pas admin ni la bonne personne 
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                statusCode: 500,
                message: 'Une erreur est survenue dans la DB'
            });
        }
    }
}

module.exports = userAuthorization;