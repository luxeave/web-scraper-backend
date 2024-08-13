const express = require('express');
const cors = require('cors');
const { scrapePage } = require('./scraper');

const app = express();
const port = process.env.PORT || 3000;

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(limiter);
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});