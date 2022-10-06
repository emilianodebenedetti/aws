const express = require('express');
const AWS = require('aws-sdk');

AWS.config.udpate({
    region: 'sa-east-1'
});

const sns = new AWS.SNS()
const SNS_TOPIC_ARN = 'arn:aws:sns:sa-east-1'

/* -------------------gzip------------------- */
const compression = require('compression') /* -npm install compression- */
const app = express()

/* log4js (loggers)  -npm install log4js-*/
/* const logger = require('./logger') */

/* ------------------Winston ------------------*/
const logger = require('./loggerWinston.js')

app.get('/sumar', (req,res) => {
    const { n1, n2 } = req.query
    if (!isNaN(n1) && !isNaN(n2)) {
        logger.info(`Paràmetros ${n1} y ${n2} correctos para la suma`);
        res.send(`La suma de ${n1} y ${n2} es ${parseInt(n1) + parseInt(n2)}`);
    } else {
        logger.error("Paràmetros incorrectos para la suma");
        res.send('Paràmetros de entrada no vàlidos');
    }
})
app.get('*', (req,res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no està implementada`)
})


const PORT = parseInt(process.argv[2]) || 8080
const server = app.listen(PORT, () => {
    logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})
server.on('error', error => logger.error(`Error en servidor: ${error}`))

/* 
Logs, profiling & debug - Parte II 56:00
*/