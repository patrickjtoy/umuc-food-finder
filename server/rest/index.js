import express from 'express'
import compression from 'compression'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'

import { logger, expressLogger, expressErrorLogger, expressErrorHandler } from '../lib/logger'
import { isProduction } from '../lib/util'
import authStrategy from '../lib/authStrategy'
import joi from '../middleware/joi'

import { SpaRouter } from './spa'
import { ApiRouter } from './api'
import { HealthRouter } from './health'

const log = logger('rest')
const app = express()

if (isProduction()) {
  app.use(cors())
  app.use(express.static(path.join(__dirname, '../../build')))
}

authStrategy(passport)

app.disable('x-powered-by')
app.use(expressLogger(log))
app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(SpaRouter)
app.use('/api', ApiRouter)
app.use('/health', HealthRouter)
app.use(joi)
app.use(expressErrorLogger(log))
app.use(expressErrorHandler)

app.listen(3000, () => log.info('service listening on port 3000'))
