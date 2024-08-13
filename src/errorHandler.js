const logger = require('./logger');
const AppError = require('./AppError');
const config = require('./config');

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    logger.error({
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        path: req.path,
        method: req.method,
    });

    if (config.nodeEnv === 'production') {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }

    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

module.exports = errorHandler;