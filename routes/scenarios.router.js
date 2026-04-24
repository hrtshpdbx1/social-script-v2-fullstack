// scenario.router.js
const scenarioRouter = require('express').Router({mergeParams:true}); //creation + héritage des params du router parent (ici "scenarioId")
const scenarioController = require('../controllers/scenario.controller');
const requireAuth = require('../middlewares/auth/auth.middleware')
const { scenarioValidator } = require('../validators/scenario.validator');
const scenarioValidation = require('../middlewares/scenario-validation');
const reportController = require('../controllers/report.controller');

scenarioRouter.route('/users/:id/scenarios')
    .get(requireAuth, scenarioController.getByUser)

scenarioRouter.route('/:scenarioId/report')
.post(requireAuth, reportController.insert)

scenarioRouter.route('/')
.get(scenarioController.getAll)
.post(requireAuth,scenarioValidation(scenarioValidator), scenarioController.insert)

scenarioRouter.route('/:id')
.get(scenarioController.getById)  



// scenarioRouter.route('/users/:id/scenarios')
//     .get(requireAuth, userAuthorization, scenarioController.getByUser)

// scenarioRouter.get("/author/:name", scenarioController.getByAuthor


// Export
module.exports = scenarioRouter