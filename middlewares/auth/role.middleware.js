// role.middleware.js
// vérifie si l'utilisateur·ice possède le bon rôle pour faire ce qu'il demande 

const { forbidden } = require("../../utils/error.utils");

// Créer une fonction `requireRole(...allowedRoles)` qui :
// - Vérifie que `req.user.role` est dans`allowedRoles`(c'est donc une "higher-order function", elle prend des args et renvoie un middleware)
// Sinon → 403

    const requireRole = (...allowedRoles) => {
        // les allowedRoles ne sont pas définis dans le middleware, ms au moment où on  appelle depuis la route. 
        // ex :.delete( roleAuthorization()('admin') , scenarioController.delete)
        return (req, res, next) => {

            // vérifie que l'utilisateur·ice est connecté·e
            if (!req.user || !req.user.role) {
                return next(forbidden());
            }

            // Vérifie que `req.user.role` est dans`allowedRoles`
            if (!allowedRoles.includes(req.user.role)) {
                return next(forbidden())
            }
            return next();
        }
    }


module.exports = requireRole; 