const listHelper = require('../utils/list_helpers')

test('dummy', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty list', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('list with one blog', () => {
    const blogs = [{
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(blogs[0].likes)
  })
  test('list with 3 blogs', () => {
    const blogs = [{
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(blogs[0].likes + blogs[1].likes + blogs[2].likes)
  })
})

describe('favorite', () => {
  test('empty list', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(null)
  })

  test('list with one blog', () => {
    const blogs = [{
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })
  test('list with 3 blogs', () => {
    const blogs = [{
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(blogs[2])
  })
})