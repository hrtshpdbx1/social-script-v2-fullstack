// role.middleware.js
// vérifie si l'utilisateur·ice possède le bon rôle pour faire ce qu'il demande


//todo : 
// Créer une fonction `requireRole(...allowedRoles)` qui :
// - Vérifie que `req.user.role` est dans`allowedRoles`(c'est donc une "higher-order function", elle prend des args et renvoie un middleware)
// Sinon → 403

const roleAuthorization = () => {

    const requireRole = (...allowedRoles) => {
        return (req, res, next) => {
            const allowedRoles = {}
            // Vérifie que `req.user.role` est dans`allowedRoles`
            if (!allowedRoles.includes(req.user.role)) {
                res.status(403).json({ 
                    statusCode: 403, 
                    message: 'Vous n\'avez pas les droits d\'accès'});
            }            
            next();
            
        }
        
    }
}

module.exports = roleAuthorization; 