import config from '../config'

export const isProduction = () => config.environment === 'production'
