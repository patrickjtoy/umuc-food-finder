import passport from 'passport'

export default (req, res, next) => {
  passport.authenticate('jwt', (error, user, info) => {
    if (error || !user) {
      return res.status(401).send({
        error: error || (info.message ? info.message : info),
      })
    }

    req.user = user
    next()
  })(req, res, next)
}
