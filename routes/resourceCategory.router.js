const categoryRouter = require('express').Router();
const categoryController = require('../controllers/resourceCategory.controller');
const resourceController = require('../controllers/resource.controller');
const { requireAuth } = require('../middlewares/auth/auth.middleware');
const requireRole = require('../middlewares/auth/role.middleware');


// ===== ROUTES PUBLIQUES =====
categoryRouter.route('/')
    .get(categoryController.getAllCategories)
    .post(requireAuth, requireRole('admin'), categoryController.createCategory);

categoryRouter.route('/:categoryId/resources')
    .get(resourceController.getPublishedResourcesByCategory);

module.exports = categoryRouter;