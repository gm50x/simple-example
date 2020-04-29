'use strict'

const { check } = require('express-validator')

module.exports = {
    questionsByIdValidator() {
        return [
            check('id').isInt(),
            check('id').not().isEmpty()
        ]
    }
}