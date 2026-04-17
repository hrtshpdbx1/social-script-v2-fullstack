const adminController = require('../controllers/admin.controller');
const scenarioController = require('../controllers/scenario.controller');
const requireAuth = require('../middlewares/auth/auth.middleware');
const requireRole = require('../middlewares/auth/role.middleware');

// admin.router.js
const adminRouter = require('express').Router();


// Protection appliquée UNE SEULE FOIS pour toutes les routes de ce fichier
adminRouter.use(requireAuth, requireRole('moderator', 'admin'));

adminRouter.route('/report')
    .get(adminController.getAllReports)
    .patch(adminController.updateReportStatus)

adminRouter.route('/scenarios/:scenarioId/status')
// [] GET : getAllScenariosPending 
// [] PATCH : updateScenarioStatusThemes 

// patch(adminCondroller.update)
// permet à un modérateur de passer un scénario à `approved` ou `rejected`. Same deal avec `reviewedBy` / `reviewedAt`.

adminRouter.route('/themes')
// [] GET : getAllThemesPending 
// [] PATCH : updateThemeStatus

module.exports = adminRouter;