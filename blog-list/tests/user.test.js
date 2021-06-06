const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const User = require('../models/user')
const config = require('../utils/config')
const connectMongo = require('../utils/mongo').connectMongo

const initialUsers = [
  {
    username: 'nhatkhoi',
    password: 'anh yeu em',
    name: 'khoi'
  },
  {
    username: 'nhithun',
    password: 'em yeu anh',
    name: 'thuan'
  },
  {
    username: 'nhithun',
    password: 'em yeu anh',
    name: 'thuan'
  }
]

beforeAll(async () => {
  await connectMongo()
})

beforeEach(async () => {
  await User.deleteMany({}) // delete all users
  let user = new User(initialUsers[0])
  await user.save()
  user = new User(initialUsers[1])
  await user.save()
})

describe('user registration validation', () => {
  test('400 for duplicated username', async () => {
    const res = await api.post('/api/users').send(initialUsers[2])
    expect(res.status).toBe(400)
  })

  test('400 for too short username or password', async () => {
    let user = {...initialUsers[0], username: "12"}
    await api.post('/api/users').send(user).expect(400)
    user = {...initialUsers[0], password: "12"}
    await api.post('/api/users').send(user).expect(400)
  })

  // TODO: test with non-existing username or password
})

afterAll(async () => {
  await mongoose.connection.close()
})