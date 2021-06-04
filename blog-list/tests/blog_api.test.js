const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('../utils/test_helpers').initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blogObject => blogObject.save())
  await Promise.all(promiseArray)
})

test('there are 2 blogs, all in JSON format', async () => {
  let res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  res = res.body
  expect(res.length).toBe(2)
})

test('all blogs have an id property', async () => {
  let res = await api.get('/api/blogs')
  res = res.body

  res.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('post a blog', async () => {
  await api.post('/api/blogs', initialBlogs[0]).expect(201)

  const res = await api.get('/api/blogs')
  expect(res.body.length).toBe(3)
})

// test('missing likes is understood as 0', async () => {
//   const newBlog = initialBlogs[0]
//   delete newBlog.likes
//   const id = await api.post('/api/blogs', newBlog).id
//   const res = api.get('/api/blogs')

//   // TODO: add handler for GET with ID
// })

afterAll(() => {
  mongoose.connection.close()
})