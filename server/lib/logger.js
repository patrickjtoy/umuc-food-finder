import { createLogger, format, Logger, transports } from 'winston'
import * as expressWinston from 'express-winston'

const { colorize, combine, json, label, splat, simple, timestamp } = format

function prodFormat(customLabel) {
  const replaceError = error => ({
    label: error.label,
    level: error.level,
    message: error.message,
    stack: error.stack,
  })
  const replacer = (key, value) => (value instanceof Error ? replaceError(value) : value)
  return combine(label({ label: customLabel }), json({ replacer }))
}

function devFormat(customLabel) {
  return combine(colorize(), label({ label: customLabel }), timestamp(), splat(), simple())
}

export const logger = customLabel => {
  const isProd = process.env.NODE_ENV === 'production'
  return createLogger({
    exitOnError: false,
    format: isProd ? prodFormat(customLabel) : devFormat(customLabel),
    level: isProd ? 'info' : 'debug',
    transports: [new transports.Console()],
  })
}

function requestFilter(req, propName) {
  if (propName === 'headers') {
    const { authorization, cookie, ...otherHeaders } = req[propName]
    return otherHeaders
  }

  return req[propName]
}

expressWinston.requestWhitelist.push('body')

export function expressLogger(winstonInstance) {
  return expressWinston.logger({ requestFilter, winstonInstance })
}

export function expressErrorLogger(winstonInstance) {
  return expressWinston.errorLogger({ requestFilter, winstonInstance })
}

export function expressErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  res.sendStatus(500)
}
