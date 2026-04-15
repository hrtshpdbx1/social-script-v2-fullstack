// role.middleware.js
// vérifie si l'utilisateur·ice possède le bon rôle pour faire ce qu'il demande 


//todo : le brancher
// Créer une fonction `requireRole(...allowedRoles)` qui :
// - Vérifie que `req.user.role` est dans`allowedRoles`(c'est donc une "higher-order function", elle prend des args et renvoie un middleware)
// Sinon → 403

const roleAuthorization = () => {

    const requireRole = (...allowedRoles) => {
        // les allowedRoles ne sont pas définis dans le middleware, ms au moment où on  appelle depuis la route. 
        // ex :.delete( roleAuthorization()('admin') , scenarioController.delete)
        return async (req, res, next) => {

            // Vérifie que `req.user.role` est dans`allowedRoles`
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Vous n\'avez pas les droits d\'accès'
                });
            }
            return next();
        }
    }
    return requireRole
    // roleAuthorization() retourne la fonction requireRole
}

module.exports = roleAuthorization; 