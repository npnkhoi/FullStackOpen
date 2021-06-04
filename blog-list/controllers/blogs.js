const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if ((!blog.url) || (!blog.title)) {
    response.status(400).end()
    return
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter