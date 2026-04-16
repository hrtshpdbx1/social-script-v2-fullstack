// scenario.router.js
const scenarioRouter = require('express').Router(); //creation
const scenarioController = require('../controllers/scenario.controller');
const requireAuth = require('../middlewares/auth/auth.middleware')
const { scenarioValidator } = require('../validators/scenario.validator');
const scenarioValidation = require('../middlewares/scenario-validation');

scenarioRouter.route('/')
.get(scenarioController.getAll)
.post(requireAuth,scenarioValidation(scenarioValidator), scenarioController.insert)

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