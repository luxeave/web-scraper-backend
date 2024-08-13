const axios = require('axios');
const cheerio = require('cheerio');
const AppError = require('./AppError');

async function scrapePage(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content') || '';

        return {
            html,
            title,
            description,
        };
    } catch (error) {
        if (error.response) {
            throw new AppError(`Failed to scrape page: ${error.response.statusText}`, error.response.status);
        }
        throw new AppError(`Failed to scrape page: ${error.message}`, 500);
    }
}

module.exports = { scrapePage };