// auth.router.js
const authController = require('../controllers/auth.controller');
const authRouter = require('express').Router();


// authRouter.route('/')

authRouter.route('/register')
    .post(authController.register)

authRouter.route('/login')
    .post(authController.login)

authRouter.route('/me')
    .get(authRouter, (req, res) => {
        // on appelle directement le middleware, car pas besoin d'argument
        res.json(req.user);  // on renvoit req.user en réponse
    }); 

// authRouter.route('/admin')
//     .get(requireAuthMiddleware, requireRoleMiddleware('admin'))  // on appelle requireRole avec 'admin', elle nous retourne un middleware



module.exports = authRouter; 