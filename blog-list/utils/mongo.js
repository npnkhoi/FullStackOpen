const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const connectMongo = async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  logger.info('connected to MongoDB')
}

module.exports = { connectMongo }