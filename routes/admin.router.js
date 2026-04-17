const adminController = require('../controllers/admin.controller');
const scenarioController = require('../controllers/scenario.controller');
const themeController = require('../controllers/theme.controller');
const requireAuth = require('../middlewares/auth/auth.middleware');
const requireRole = require('../middlewares/auth/role.middleware');

// admin.router.js
const adminRouter = require('express').Router();


// Protection appliquée UNE SEULE FOIS pour toutes les routes de ce fichier
adminRouter.use(requireAuth, requireRole('moderator', 'admin'));

adminRouter.route('/report')
    .get(adminController.getAllReports)

  adminRouter.route('/report/:reportId')  
    .patch(adminController.updateReportStatus)

adminRouter.route('/scenarios')
.get(adminController.getAllScenariosPending)


adminRouter.route('/scenarios/:scenarioId/status')
.patch(adminController.updateScenarioStatus)


adminRouter.route('/themes')
.get(adminController.getAllThemesPending)

adminRouter.route('/themes/:themeId/status')
.patch(adminController.updateThemeStatus)


module.exports = adminRouter;