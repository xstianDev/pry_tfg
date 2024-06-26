import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.cli(),
    winston.format.splat(),
    winston.format.printf(info => `${info.level}: ${info.message}`)
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
    levels,
    format,
    transports,
});

export default logger;