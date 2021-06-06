const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
  const newUser = request.body
  // check existence of fields
  if (!(newUser.name && newUser.username && newUser.password)) {
    response.status(400).json('Invalid user info')
    return
  }
  // check length of fields
  if (!(newUser.username.length >= 3 && newUser.password.length >= 3)) {
    response.status(400).json('username and/or password are too short')
    return
  }
  // check uniqueness of username
  const dup = await User.findOne({username: newUser.username});
  if (dup) {
    response.status(400).json('duplicated username')
    return
  }

  const saltRounds = 10
  newUser.password = await bcrypt.hash(newUser.password, saltRounds) // encrypt the password
  const user = new User(newUser)
  const res = await user.save() // save to MongoDB database
  if (res) {
    response.json(res)
  } else {
    response.status(400)
  }
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  if (users) {
    response.json(users)
  } else {
    response.status(400).end()
  }
})

module.exports = userRouter