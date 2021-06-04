const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  }).catch((e) => {
    logger.error('error connecting to mongoDB:', e.message)
  })

module.exports = app