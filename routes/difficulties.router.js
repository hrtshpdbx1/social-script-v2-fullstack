//difficulty.router.js
const difficultyRouter = require('express').Router();
const difficultyController = require('../controllers/difficulty.controller')


difficultyRouter.route('/')
.get(difficultyController.getAllDifficulties)


module.exports = difficultyRouter