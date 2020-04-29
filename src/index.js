'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const router = require('./router')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('tiny'))

app.use(router)

let server
const init = () => {
    server = app.listen(PORT, console.log(`Server listening on ${PORT}`))
}

const stop = () => {
    server.close()
}

init()
