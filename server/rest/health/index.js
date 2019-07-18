import { Router } from 'express'
import { sequelize } from '../../lib/sequelize'
import { logger } from '../../lib/logger'

const log = logger('health')
const router = Router()

router.get('/', async (req, res, next) => {
  try {
    await sequelize.query('SELECT 1')
    return res.sendStatus(200)
  } catch (error) {
    log.error('Error running health check', error)
    return next(error)
  }
})

export const HealthRouter = router
