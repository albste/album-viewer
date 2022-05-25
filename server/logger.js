const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logConfiguration = {
    transports: [
        new transports.Console({
            level: 'warn'
        }), 
        new transports.DailyRotateFile({
            name: 'info',
            filename: 'server/logs/albumviewer-server.log',
            prepend: true,
            maxFiles: '1d',
            maxSize: '10m',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        })
    ]
};

module.exports = createLogger(logConfiguration);