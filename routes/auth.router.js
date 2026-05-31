// auth.router.js
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth/auth.middleware');
const authRouter = require('express').Router();


// authRouter.route('/')

authRouter.route('/register')
    .post(authController.register)

authRouter.route('/login')
    .post(authController.login)

authRouter.route('/me')
    .get(requireAuth, (req, res) => {
        res.json(req.user);
    });
// authRouter.route('/admin')
//     .get(requireAuthMiddleware, requireRoleMiddleware('admin'))  // on appelle requireRole avec 'admin', elle nous retourne un middleware



module.exports = authRouter; 