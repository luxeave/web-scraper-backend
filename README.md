# Web Scraper Backend

This is the backend for a web scraping application.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and fill in the values
4. Run `npm run dev` to start the development server

## Available Scripts

- `npm start`: Start the server
- `npm run dev`: Start the server with nodemon for development
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint and fix issues
- `npm run format`: Format code with Prettier

## Environment Variables

- `PORT`: The port the server will run on
- `NODE_ENV`: The environment (development, production, etc.)
- `RATE_LIMIT_WINDOW_MS`: The time window for rate limiting in milliseconds
- `RATE_LIMIT_MAX_REQUESTS`: The maximum number of requests allowed in the rate limit window