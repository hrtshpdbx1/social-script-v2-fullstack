// scenario.router.js
const scenarioRouter = require('express').Router(); //creation
const scenarioController = require('../controllers/scenario.controller');


scenarioRouter.route('/')
.get(scenarioController.getAll)
.post(scenarioController.insert)



scenarioRouter.route('/:id')
.get(scenarioController.getById)
// .get(scenarioController.getByAuthor)
// .get(scenarioController.getByTheme)
// .get(scenarioController.getByDifficulty)
.put(scenarioController.update)
.delete(scenarioController.delete)
.patch(scenarioController.updateStatus)


// scenarioController.get("/author/:name", scenarioController.getByAuthor


// Export
module.exports = scenarioRouter