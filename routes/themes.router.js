// themes.router.js

const themeController = require('../controllers/theme.controller')
const scenarioController = require('../controllers/scenario.controller');
const requireAuth = require('../middlewares/auth/auth.middleware');
const themeRouter = require('express').Router({mergeParams:true})
// mergeParams = Preserve the req.params values from the parent router
// ThemeRouter ne voit en principe que ce qui est dans son URL à lui
// Comme ci on a besoin de "/difficulties/:difficultyId/themes"
// mergeParams transmet le ":difficulty" du router Parent (index) au router Enfant (themeRouter)

themeRouter.route('/')
.get(themeController.getThemeByDifficulty)
.post(requireAuth, themeController.insert);

themeRouter.route('/:themeId/scenarios')
.get(scenarioController.getByThemeId) // version légère, "liste"



module.exports = themeRouter
