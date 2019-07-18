import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../models'
import config from '../config'

export default passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.appKey,
  }

  passport.use(
    new Strategy(opts, async function(jwt, done) {
      const user = await User.findById(jwt.user_id)

      if (user) {
        return done(null, user)
      }

      return done(null, false, 'No user found with given token')
    })
  )
}
