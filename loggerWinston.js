const winston = require('winston')
require('dotenv').config()

function buildProdLogger() {
    const prodLogger = winston.createLogger({
        transports : [
            new winston.transports.Console({ filename:'debugW.log', level:'debug'}),
            new winston.transports.File({ filename:'errorW.log', level:'error'}),   
        ]
    })
    return prodLogger
}

function buildDevLogger() {
    const devLogger = winston.createLogger({
        transports : [
            new winston.transports.Console({ level:'info'})
        ]
    })
    return devLogger
}

let logger = null

if (process.env.NODE_ENV === 'PROD') {
    logger = buildProdLogger()
} else {
    logger = buildDevLogger()
}

module.exports = logger
    
/* const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({ level:'verbose'}),
        new winston.transports.File({ filename:'info.log', level:'error'}),

    ]
}) */