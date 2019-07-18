import { Router } from 'express'
import Joi from 'joi'
import { User } from '../../models'
import validator from '../../lib/validator'
import { logger } from '../../lib/logger'

const log = logger('authenticate-api')
const router = Router()

const authenticateSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
})

router.post('/', validator.body(authenticateSchema), async (req, res) => {
  const {
    body: { email, password },
  } = req

  try {
    const user = await User.findOne({ where: { email } })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(422).send({ error: 'Invalid Credentials' })
    }

    return res.status(201).send({
      user: await user.toAPI(),
      token: user.jwt(),
    })
  } catch (error) {
    log.error(error)
    return res.sendStatus(500)
  }
})

export const AuthenticateAPIRouter = router
