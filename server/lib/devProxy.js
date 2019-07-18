import proxy from 'http-proxy-middleware'
import { concat, compose, partialRight, test } from 'ramda'

const devProxy = partialRight(proxy, [
  {
    target: 'http://localhost:3001', // React-scripts development server
    changeOrigin: true,
    ws: true,
  },
])

const matchPath = routes => path => routes.some(rx => test(new RegExp(`^${rx}$`), path))

const internalDevRoutes = ['/static/.*', '/sockjs-node/.*']

export default compose(
  devProxy,
  matchPath,
  concat(internalDevRoutes)
)
