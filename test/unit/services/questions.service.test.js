const { strictEqual } = require('assert')
const proxyquire = require('proxyquire')

describe('Questions Service', () => {
    describe('getAllQuestions()', () => {
        it('Should return a promise', () => {
            const { getAllQuestions } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getAll: resolveWithData }
            })
            const result = getAllQuestions()
            const actual = result instanceof Promise
            strictEqual(actual, true)
        })
        it('Should return an array on resolve', async () => {
            const { getAllQuestions } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getAll: resolveWithData }
            })
            const result = await getAllQuestions()
            strictEqual(Array.isArray(result), true)
        })
        it('Should return an array with questions on resolve', async () => {
            const { getAllQuestions } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getAll: resolveWithData }
            })
            const result = await getAllQuestions()
            result.forEach(q => {
                Object.keys(q).forEach(key => {
                    const actual = ['id', 'question', 'answer'].includes(key)
                    strictEqual(actual, true)
                })
            })
        })
        it('Should return an error on reject', async () => {
            const { getAllQuestions } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getAll: rejectWithError }
            })
            try {
                await getAllQuestions()
            } catch (err) {
                strictEqual(!!err, true)
            }
        })
    })
    describe('getQuestionById()', () => {
        it('Should return a promise', () => {
            const { getQuestionById } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getById: resolveWithSingleData }
            })
            let id = 1
            const result = getQuestionById(id)
            const actual = result instanceof Promise
            strictEqual(actual, true)
        })
        it('Should return an object on resolve', async () => {
            const { getQuestionById } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getById: resolveWithSingleData }
            })
            let id = 1
            const result = await getQuestionById(id)
            const actual = Object.prototype.toString.call(result) === '[object Object]'
            strictEqual(actual, true)
        })
        it('Should return an object with specific properties on resolve', async () => {
            const { getQuestionById } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getById: resolveWithSingleData }
            })
            let id = 1
            const result = await getQuestionById(id)
            Object.keys(result).forEach(key => {
                const actual = ['id', 'question', 'answer'].includes(key)
                strictEqual(actual, true)
            })
        })
        it('Should return an object with all specified properties on resolve', async () => {
            const { getQuestionById } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getById: resolveWithSingleData }
            })
            let id = 1
            const result = await getQuestionById(id)
            Object.keys(result).forEach(key => {
                const actual = ['id', 'question', 'answer'].includes(key) && result[key] !== undefined && result[key] !== null
                strictEqual(actual, true)
            })
        })
        it('Should return an error on reject', async () => {
            const { getQuestionById } = proxyquire('../../../src/services/questions.service', {
                '../repositories/questions.repository': { getById: rejectWithError }
            })
            try {
                let id = 1
                await getQuestionById(id)
            } catch (err) {
                strictEqual(!!err, true)
            }
        })
    })
})


const resolveWithData = () => {
    return Promise.resolve(mock)
}

const resolveWithSingleData = (id) => {
    return Promise.resolve(mock[0])
}

const rejectWithError = () => {
    return Promise.reject({ message: 'Testing Error' })
}

const mock = [
    { id: 1, question: 'Who is this?', answer: 'It\'sa me, Mario!' },
    { id: 2, question: 'Who is this?', answer: 'It\'sa me, Luigi!' },
    { id: 3, question: 'Who is this?', answer: 'It\'sa me, Bowser!' },
    { id: 4, question: 'Who is this?', answer: 'It\'sa me, Yoshi!' },
    { id: 5, question: 'Who is this?', answer: 'It\'sa me, Peach!' }
]