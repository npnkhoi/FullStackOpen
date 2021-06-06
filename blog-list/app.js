require('express-async-errors')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const connectMongo = require('./utils/mongo').connectMongo
const middlewares = require('./utils/middlewares')
const app = express()
app.use(express.json())
app.use(cors())
app.use(middlewares.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middlewares.errorHandler)

if (process.env.NODE_ENV !== 'test') {
  connectMongo()
}

module.exports = app