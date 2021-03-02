const { format } = require('winston')
const winston = require('winston')
const logger = winston.createLogger({
    level     : 'info',
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.splat(),
                format.simple()
            )
        })
    ],
    exitOnError: false
})

module.exports = { logger }