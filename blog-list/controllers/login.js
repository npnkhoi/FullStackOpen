const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const userInfo = request.body // this contain username and _id
  const savedUser = await User.findOne({username: userInfo.username})
  if (!savedUser) {
    response.status(400).json('username does not exist').end()
  }
  if (!bcrypt.compare(userInfo.password, savedUser.password)) {
    response.status(400).json('wrong password').end()
  }

  // The userInfo is correct
  const userForToken = {
    username: userInfo.username,
    id: savedUser._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .json(token)
})

module.exports = loginRouter