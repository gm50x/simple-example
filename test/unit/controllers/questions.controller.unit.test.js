const assert = require('assert')
const proxyquire = require('proxyquire')

describe('Questions Controller', () => {
    describe('GET /questions', () => {
        it('should return 200', async () => {
            const { getAllQuestions } = proxyquire('../../../src/controllers/questions.controller', { '../services/questions.service': { getAllQuestions: successWithData } })
            await getAllQuestions(req, res)
            assert.strictEqual(response.value, 200)
        })
        it('should return 500', async () => {
            const { getAllQuestions } = proxyquire('../../../src/controllers/questions.controller', { '../services/questions.service': { getAllQuestions: failure } })
            await getAllQuestions(req, res)
            assert.strictEqual(response.value, 500)
        })
    })

    describe('GET /questions/:id', () => {
        it('should return 200', async () => {
            req.params.id = 1
            const { getQuestionById } = proxyquire('../../../src/controllers/questions.controller', { '../services/questions.service': { getQuestionById: successWithSingleData } })
            await getQuestionById(req, res)
            assert.strictEqual(response.value, 200)
        })
        it('should return 404', async () => {
            req.params.id = 1
            const { getQuestionById } = proxyquire('../../../src/controllers/questions.controller', { '../services/questions.service': { getQuestionById: successWithoutData } })
            await getQuestionById(req, res)
            assert.strictEqual(response.value, 404)
        })
        it('should return 500', async () => {
            const { getQuestionById } = proxyquire('../../../src/controllers/questions.controller', { '../services/questions.service': { getQuestionById: failure } })
            await getQuestionById(req, res)
            assert.strictEqual(response.value, 500)
        })
    })
})


// MOCKS AND SETUPS
let req = {
    header: {},
    params: {},
    query: {},
    body: {}
}

let res = {
    status: (statusCode) => {
        response.value = statusCode
        return {
            json: () => { }
        }
    }
}
let response = {
    value: null
}

const successWithData = () => {
    return Promise.resolve(mock)
}

const successWithSingleData = () => {
    return Promise.resolve(mock[0])
}

const successWithoutData = () => {
    return Promise.resolve()
}

const failure = () => {
    return Promise.reject({message: 'Testing errors'})
}

const mock = [
    { id: 1, question: 'Who is this?', answer: 'It\'sa me, Mario!' },
    { id: 2, question: 'Who is this?', answer: 'It\'sa me, Luigi!' },
    { id: 3, question: 'Who is this?', answer: 'It\'sa me, Bowser!' },
    { id: 4, question: 'Who is this?', answer: 'It\'sa me, Yoshi!' },
    { id: 5, question: 'Who is this?', answer: 'It\'sa me, Peach!' }
]