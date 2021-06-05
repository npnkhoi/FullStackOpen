const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const apiHelper = require('../utils/api_helper')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  if (!apiHelper.validId(id)) {
    response.status(400).json('Invalid ID format').end()
    return
  }
  const blog = await Blog.findById(id)
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

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  if (!apiHelper.validId(id)) {
    response.status(400).json('Invalid ID format').end()
    return
  }
  const res = await Blog.deleteOne({_id: id})
  if (res) {
    response.json('successfully deleted (if any)')
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  if (!apiHelper.validId(id)) {
    response.status(400).json('Invalid ID format').end()
    return
  }
  const newBlog = request.body
  const res = await Blog.findOneAndUpdate({_id: id}, newBlog)
  if (res) {
    response.json(res)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter