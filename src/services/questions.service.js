const repository = require('../repositories/questions.repository')

module.exports = {
    async getAllQuestions() {
        return repository.getAll()
    },
    async getQuestionById(id) {
        return repository.getById(id)
    }
}