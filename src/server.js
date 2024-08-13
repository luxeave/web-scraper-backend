const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const expressWinston = require('express-winston');
const { scrapePage } = require('./scraper');
const config = require('./config');
// error handling
const logger = require('./logger');
const AppError = require('./AppError');
const errorHandler = require('./errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Request logging
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
}));

const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    handler: (req, res) => {
        throw new AppError('Too many requests', 429);
    },
});

app.use(limiter);

app.post('/scrape', async (req, res, next) => {
    try {
        const { url } = req.body;

        if (!url) {
            throw new AppError('URL is required', 400);
        }

        try {
            new URL(url);
        } catch (error) {
            throw new AppError('Invalid URL', 400);
        }

        const scrapedData = await scrapePage(url);
        res.json(scrapedData);
    } catch (error) {
        next(error);
    }
});

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(errorHandler);

app.listen(config.port, () => {
    logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

// Unhandled rejection handler
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    // In a production environment, you might want to gracefully shut down the server
    // server.close(() => process.exit(1));
});