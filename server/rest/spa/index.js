import { Router } from 'express'
import path from 'path'

import devProxy from '../../lib/devProxy'
import { isProduction } from '../../lib/util'

const router = Router()

const routes = ['/', '/auth', '/results', '/settings']

router.get(routes, async (req, res, next) => res.sendFile(path.join(__dirname, '../../../build', 'index.html')))

export const SpaRouter = isProduction() ? router : devProxy(routes)
