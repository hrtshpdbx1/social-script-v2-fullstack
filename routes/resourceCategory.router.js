const categoryRouter = require('express').Router();
const categoryController = require('../controllers/resourceCategory.controller');
const resourceController = require('../controllers/resource.controller');

categoryRouter.route('/')
    .get(categoryController.getAllCategories); 

categoryRouter.route('/:categoryId/resources')
    .get(resourceController.getPublishedResourcesByCategory); 

module.exports = categoryRouter;