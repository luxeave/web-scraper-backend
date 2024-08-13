const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { scrapePage } = require('./scraper');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests
});

app.use(limiter);

const { URL } = require('url');

app.post('/scrape', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const scrapedData = await scrapePage(url);
        res.json(scrapedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});