const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middlewares/auth/auth.middleware');

userRouter.route('/me')
    .get(requireAuth, userController.getMe);

module.exports = userRouter;