const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const password = process.argv[2]
const mongoUrl = `mongodb+srv://khoi:${password}@cluster0.j1mpf.mongodb.net/blog-list?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blog = new Blog({
  title: "prod",
  author: "fake",
  url: "http",
  "likes": 17
})

blog.save().then(result => {
  console.log('blog saved!');
  mongoose.connection.close()
})