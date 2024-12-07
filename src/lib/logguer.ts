import {createLogger, format, transports} from 'winston';

const logLevel = 'info'

const logger = createLogger({
    level: logLevel,
    levels: {
        fatal: 0,
        crit: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5
    },
    format: format.combine(
        format.prettyPrint(),
        format.timestamp({
            format: 'DD-MM-YYYY hh:mm:ss A'
        }),
        format.printf(nfo => {
            return `${nfo.timestamp} - ${nfo.level}: ${nfo.message}`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'app.log'
        })
    ]
});

export default logger;