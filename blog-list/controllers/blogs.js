const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const apiHelper = require('../utils/api_helper')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, _id: 1})
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
  const token = request.token
  if (!token) {
    response.end()
  }
  const userInfo = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(userInfo.id)
  blog.user = user._id
  if ((!blog.url) || (!blog.title) || (!user)) {
    response.status(400).end()
    return
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save() // replact the current user document
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  if (!apiHelper.validId(id)) {
    response.status(400).json('Invalid ID format').end()
    return
  }
  const token = request.token
  if (!token) {
    response.status(400).send('Token missing')
  }
  const blog = await Blog.findById(id)
  if (!blog) {
    response.status(400).send('blog not found')
  }
  const user = jwt.verify(token, process.env.SECRET)
  if (blog.user && user.id.toString() !== blog.user.toString()) { // still check if a blog has an associated user
    response.status(400).send('this user does not have the right to delete this blog')
  }
  await Blog.deleteOne({_id: id})
  response.status(200).json('successfully deleted')
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