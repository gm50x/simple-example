'use strict'

const Router = require('express').Router();

const {getAllQuestions, getQuestionById} = require('./controllers/questions.controller');
const {questionsByIdValidator} = require('./validators/questions.validators')


Router.get('/questions', getAllQuestions)
Router.get('/questions/:id', questionsByIdValidator(), getQuestionById)

module.exports = Router