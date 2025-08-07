# Localhost API Tester

Localhost API Tester is a lightweight, browser-based tool designed for quickly testing HTTP APIs running on `localhost`. It provides a clean and user-friendly interface to send authenticated requests, upload files, and test various HTTP methods such as GET, POST, PUT, and DELETE.

## Features

- Supports HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- JWT bearer token support (optional)
- File upload with `multipart/form-data`
- Raw JSON body input for `POST` and `PUT` requests
- Response viewer with syntax-highlighted JSON output
- Extract and copy access tokens from responses
- Validates URL to only allow requests to `localhost`
- Error handling and feedback for invalid JSON and failed requests

## Project Structure

```
localhost-api-tester/
├── index.html          # Main application (HTML, CSS, JavaScript in one file)
├── README.md           # Project documentation
├── assets/             # (Optional) Folder for static assets like images or sample files
├── scripts/            # (Optional) JS file if logic is extracted from HTML
├── styles/             # (Optional) CSS file if styles are extracted
└── .gitignore          # (Optional) Git ignore rules
```

## Getting Started

### Prerequisites

You only need a modern web browser such as:

- Google Chrome
- Firefox
- Edge
- Safari

### Installation

No installation is required. You can simply open the `index.html` file directly in your browser.

### Usage

1. Open `index.html` in your browser.
2. Enter the local API endpoint (must start with `http://localhost`).
3. Choose the HTTP method (`GET`, `POST`, `PUT`, `DELETE`).
4. (Optional) Add a JWT token.
5. (Optional) Upload a file if your endpoint accepts it.
6. (Optional) Enter JSON body (used with `POST` and `PUT`).
7. Click **Submit Request**.
8. View the response in the output area. If the response contains an `access_token`, it will be extracted and displayed for easy copying.

## Example

Here's an example setup to test a local login API:

- **Request URL:** `http://localhost:3000/api/login`
- **Method:** `POST`
- **JSON Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

The response will show the result, and if it contains `access_token`, a copy button will appear.

## Limitations

- Only accepts URLs starting with `http://localhost`
- No persistent storage or saved history
- Not intended for production or remote API testing

## Security Notice

This tool is designed for **local development only**. Do not use it to test production APIs or submit sensitive information over public networks.

## License

This project is open-source and available under the MIT License.

## Author

Created by Bazil Suhail
