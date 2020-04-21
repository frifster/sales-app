const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/apis')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', api)

// for local testing
// const port = 3001
// app.listen(port, () => console.log(`Invoice Maker listening at http://localhost:${port}`))

exports.app = functions.https.onRequest(app)
