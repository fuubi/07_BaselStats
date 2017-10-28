import winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    /* new (winston.transports.File)({
      filename: config.logger.path,
      level: config.logger.level
    }) */
  ]
});

// Export Module as Logger
module.exports = logger;