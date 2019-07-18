export default (error, req, res, next) => {
  if (error.error.isJoi) {
    res.status(400).send({
      error: error.error.toString(),
    })
  }

  return next(error)
}
