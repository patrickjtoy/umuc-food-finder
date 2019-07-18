import { Router } from 'express'
import { pluck } from 'ramda'
import Sequelize from 'sequelize'
import Joi from 'joi'
import { User } from '../../models'
import validator from '../../lib/validator'
import { logger } from '../../lib/logger'

const log = logger('register-api')
const router = Router()

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  firstName: Joi.string()
    .min(3)
    .max(255),
  lastName: Joi.string()
    .min(3)
    .max(255),
})

router.post('/', validator.body(registerSchema), async (req, res) => {
  const { body } = req

  try {
    const user = await User.create(body)

    return res.status(201).send({
      user: await user.toAPI(),
      token: user.jwt(),
    })
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      log.warn(error)
      return res.status(400).send({ error: pluck('message', error.errors) })
    }

    log.error(error)
    return res.sendStatus(500)
  }
})

export const RegisterAPIRouter = router
