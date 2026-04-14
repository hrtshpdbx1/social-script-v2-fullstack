// scenario.router.js
const scenarioRouter = require('express').Router(); //creation
const scenarioController = require('../controllers/scenario.controller');
const themeController = require('../controllers/theme.controller');
const requireAuth = require('../middlewares/auth/auth.middleware')

scenarioRouter.route('/')
.get(scenarioController.getAll)
.post(scenarioController.insert) //todo


scenarioRouter.route('/:id')
.get(scenarioController.getById)  
.put(scenarioController.update) //todo
.delete(scenarioController.delete) //todo
.patch(scenarioController.updateStatus) //todo

scenarioRouter.route('/users/:id/scenarios')
    .get(requireAuth, scenarioController.getByUser)

// scenarioRouter.route('/users/:id/scenarios')
//     .get(requireAuth, userAuthorization, scenarioController.getByUser)

// scenarioRouter.get("/author/:name", scenarioController.getByAuthor


// Export
module.exports = scenarioRouter