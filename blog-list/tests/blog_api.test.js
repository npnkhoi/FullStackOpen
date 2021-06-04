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

describe('basic GET and POST', () => {
  test('there are 2 blogs, all in JSON format', async () => {
    let res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    res = res.body
    expect(res.length).toBe(2)
  })
  
  test('post a blog', async () => {
    await api.post('/api/blogs').send(initialBlogs[0]).expect(201)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(3)
  })
})

describe('check properties', () => {
  test('all blogs have an id property', async () => {
    let res = await api.get('/api/blogs')
    res = res.body
  
    res.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  test('missing likes is understood as 0', async () => {
    const newBlog = initialBlogs[0]
    delete newBlog.likes
    let res = await api.post('/api/blogs').send(newBlog).expect(201)
    const id = res.body.id
    res = await api.get(`/api/blogs/${id}`)
    expect(res.body.likes).toBe(0)
  })
  
  test('missing title causes 400', async () => {
    const newBlog = initialBlogs[0]
    delete newBlog.title
    await api.post('/api/blogs', newBlog).expect(400)
  })
  
  test('missing url causes 400', async () => {
    const newBlog = initialBlogs[0]
    delete newBlog.url
    await api.post('/api/blogs', newBlog).expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})