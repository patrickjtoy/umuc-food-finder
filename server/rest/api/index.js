import { Router } from 'express'

import { AuthenticateAPIRouter } from './authenticateAPIRouter'
import { PreferenceAPIRouter } from './preferenceAPIRouter'
import { RestaurantsAPIRouter } from './restaurantsAPIRouter'
import { RegisterAPIRouter } from './registerAPIRouter'

const router = Router()

router.use('/authenticate', AuthenticateAPIRouter)
router.use('/register', RegisterAPIRouter)
router.use('/restaurants', RestaurantsAPIRouter)
router.use('/preference', PreferenceAPIRouter)

export const ApiRouter = router
