const themeController = require('../controllers/theme.controller')

const themeRouter = require('express').Router({mergeParams:true})
// mergeParams = Preserve the req.params values from the parent router

themeRouter.route('/')
.get(themeController.getByDifficulty)

module.exports = themeRouter
