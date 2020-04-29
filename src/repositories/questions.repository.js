'use strict'


// database dependencies go here


// MOCK
const questions = [
    {id: 1, question: 'Whose your daddy?', answer: 'Foo is not Bar'},
    {id: 2, question: 'Is there no spoon?', answer: 'Fizz is not Buzz'},
    {id: 3, question: 'Are you a maverick?', answer: 'Bin is not Baz'},
]

module.exports = {
    async getAll() {
        return new Promise((resolve, reject) => {
            resolve(questions)
        })
    },
    async getById(id) {
        return new Promise((resolve, reject) => {
            const question = questions.find(p => p.id === id)
            resolve(question)
        })
    }
}