import { Router } from 'express'
import { take } from 'ramda'
import Joi from 'joi'
import validator from '../../lib/validator'
import * as yelp from '../../lib/yelp'
import { logger } from '../../lib/logger'

const log = logger('restaurants-api')
const router = Router()

const restaurantSearchSchema = Joi.object({
  search: Joi.string().required(),
  location: Joi.number()
    .integer()
    .required(),
  price: Joi.number()
    .integer()
    .min(1)
    .max(3),
  criteria: Joi.array().items(Joi.string()),
})

router.post('/', validator.body(restaurantSearchSchema), async (req, res) => {
  const { body } = req

  try {
    const restaurants = await yelp.search(body).then(take(3))
    return res.status(200).send(restaurants)
  } catch (error) {
    log.warn(error)
    return res.sendStatus(500)
  }
})

export const RestaurantsAPIRouter = router
