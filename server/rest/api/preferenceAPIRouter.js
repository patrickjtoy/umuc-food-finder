import { Router } from 'express'
import Joi from 'joi'
import Sequelize from 'sequelize'
import { Preference } from '../../models'
import auth from '../../middleware/auth'
import { logger } from '../../lib/logger'
import validator from '../../lib/validator'

const preferenceSchema = Joi.object({
  location: Joi.number()
    .integer()
    .required(),
  price: Joi.number()
    .integer()
    .min(1)
    .max(3),
  criteria: Joi.array().items(Joi.string()),
})

const log = logger('preferences-api')
const router = Router()

router.get('/', auth, async (req, res) => {
  const preference = await req.user.getPreference()

  if (!preference) {
    return res.sendStatus(404)
  }

  return res.status(200).send(preference)
})

router.post('/', auth, validator.body(preferenceSchema), async (req, res) => {
  const { body, user } = req

  try {
    const preference = (await user.getPreference()) || new Preference()
    await preference.update({ ...body, userId: user.id })
    return res.status(200).send(preference)
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      log.warn(error)
      return res.sendStatus(409)
    }
    if (error instanceof Sequelize.ValidationError) {
      log.warn(error)
      return res.sendStatus(400)
    }

    log.error(error)
    return res.sendStatus(500)
  }
})

export const PreferenceAPIRouter = router
