require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const database = require('./database/connect')

var app = express()

app.use(cors()) //*Cross-origin resource sharing.
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//*connect to the DB with IIFE
;(async () => {
    database.connectDB()
})()

module.exports = app
