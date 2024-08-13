const axios = require('axios');
const cheerio = require('cheerio');

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
        throw new Error(`Failed to scrape page: ${error.message}`);
    }
}

module.exports = { scrapePage };