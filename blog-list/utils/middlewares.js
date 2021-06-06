const tokenExtractor = (request, response, next) => {
  const token = request.headers.authorization
  if (token && token.startsWith('Bearer')) {
    request.token = token.substring(7)
  } else {
    request.token = null
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    console.log(error);
    return response.status(401).send('Invalid token')
  }
}

module.exports = {tokenExtractor, errorHandler}