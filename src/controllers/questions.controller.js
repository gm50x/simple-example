const questionService = require('../services/questions.service')
const { validationResult } = require('express-validator')


module.exports = {
    async getAllQuestions(req, res) {
        try {
            const questions = await questionService.getAllQuestions()
            res.status(200).json(questions)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    async getQuestionById(req, res) {
        const { errors } = validationResult(req)
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Unexpected Inputs', errors: errors.map(p => p.param) })
        }

        try {
            const { id } = req.params
            const question = await questionService.getQuestionById(Number(id))

            if (question) {
                res.status(200).json(question)
            } else {
                res.status(404).json({message: `Question ID ${id}, could not be found`})
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }

    }
}