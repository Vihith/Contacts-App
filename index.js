const express = require('express')
const mongoose = require('./config/database')
const routes = require('./config/routes')
const app = express()
const port = 3006

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
    console.log('listening on port', port)
})