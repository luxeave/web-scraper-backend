const { scrapePage } = require('./scraper');
const nock = require('nock');

// Mock a simple HTML page
const mockHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Page</title>
  <meta name="description" content="This is a test page">
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
`;

describe('scrapePage', () => {
    beforeEach(() => {
        nock('https://example.com')
            .get('/')
            .reply(200, mockHtml);
    });

    it('should scrape a page and return HTML content and metadata', async () => {
        const result = await scrapePage('https://example.com');

        expect(result.html).toBe(mockHtml);
        expect(result.title).toBe('Test Page');
        expect(result.description).toBe('This is a test page');
    });

    it('should throw an error when scraping fails', async () => {
        nock('https://example.com')
            .get('/error')
            .replyWithError('Network error');

        await expect(scrapePage('https://example.com/error')).rejects.toThrow('Failed to scrape page');
    });
});