// themes.router.js

const themeController = require('../controllers/theme.controller')
const scenarioController = require('../controllers/scenario.controller')
const themeRouter = require('express').Router({mergeParams:true})
// mergeParams = Preserve the req.params values from the parent router


themeRouter.route('/')
.get(themeController.getByDifficulty)

themeRouter.route('/:themeId/scenarios')
.get(scenarioController.getByThemeId)

module.exports = themeRouter
