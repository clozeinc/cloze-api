# Cloze JavaScript API Client

A pure JavaScript client library for the Cloze REST API with support for both direct HTTP requests (fetch)
and when an integrated application is running in an iframe.

## Installation

Include the script in your HTML:

```html
<script src="cloze-api.js"></script>
```

Or if using a module system:

```javascript
const Cloze = require('./cloze-api.js');
// or
import Cloze from './cloze-api.js';
```

## Quick Start

### Using Fetch Backend (Direct API Calls)

```javascript
const cloze = new Cloze('your-api-key-here');

// Find people
const people = await cloze.people.find({ max: 10 });

// Get a specific person
const person = await cloze.people.get('john@example.com');

// Create a new person
const newPerson = await cloze.people.create({
  name: 'John Doe',
  emails: [ { value: 'john.doe@example.com' } ],
  phones: [ { value: '+1-650-555-0191' } ]
});
```

### Using PostMessage Backend (Iframe Communication)

If your code is running in an iframe and you want to communicate with a parent window that handles the actual API requests:

```javascript
const cloze = new Cloze();

// Use the same API otherwise
const people = await cloze.people.find({ max: 10 });
```

## TypeScript Support

TypeScript definitions are included in `cloze-api.d.ts`.
But, note that the definitive definition of parameters is available at https://developer.cloze.com

## Browser Compatibility

This library uses modern JavaScript features:
- `async/await`
- `fetch` API
- `Promise`
- `URL` class
- `postMessage` API

Ensure your target browsers support these features or use appropriate polyfills.

## Security Notes

### API Key Storage
- Never commit API keys to version control
- Store API keys securely (environment variables, secure storage)
- Use HTTPS for all API communications

## License

MIT

## Support

For more API documentation, visit: https://developer.cloze.com

For issues and questions about the Cloze API, visit: https://help.cloze.com/
