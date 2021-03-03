const { format } = require('winston')
const winston = require('winston')
const logger = winston.createLogger({
    level     : 'debug',
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.splat(),
                format.json()
            )
        })
    ],
    exitOnError: false
})

module.exports = { logger }