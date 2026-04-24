const resourceRouter = require('express').Router();
const resourceController = require('../controllers/resource.controller');
const requireAuth = require('../middlewares/auth/auth.middleware');
const requireRole = require('../middlewares/auth/role.middleware');

// route publique
resourceRouter.route('/:resourceId')
    .get(resourceController.getResourceById); 

// modo et admin only 
resourceRouter.use(requireAuth, requireRole('admin', 'moderator')); 

resourceRouter.route('/')
    .post(resourceController.insertResource); 

resourceRouter.route('/:id')
    .patch(resourceController.updateResource) 
    .delete(resourceController.deleteResource); 

module.exports = resourceRouter;