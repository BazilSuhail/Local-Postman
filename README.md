# Axon-Client

**Axon-Client** is a lightweight, browser-based API testing tool built with **Vue.js** and **Vite**. It is designed for developers who need a fast, user-friendly interface to test HTTP APIs running on `localhost`.  

It provides essential features like authenticated requests, JSON body input, file uploads, and a clean response viewer with syntax highlighting.

---

## ✨ Features

- Supports HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- JWT bearer token support (optional)
- File upload with `multipart/form-data`
- Raw JSON body editor for `POST` and `PUT`
- Syntax-highlighted JSON response viewer
- Extract and copy access tokens from responses
- Validates requests to only allow `http://localhost` endpoints
- Error handling for invalid JSON and failed requests
- Simple, modern Vue 3 interface

---

## 📂 Project Structure

```
Axon-Client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── DropDown.vue
│   │   ├── RequestForm.vue
│   │   ├── ResponseView.vue
│   │   └── Sidebar.vue
│   ├── composables/        # Reusable logic
│   │   └── useApiTester.js
│   ├── views/              # Page-level views
│   │   ├── HomeView.vue
│   │   └── HistoryView.vue
│   ├── App.vue             # Root component
│   ├── main.js             # App entry point
│   └── style.css           # Global styles
├── index.html              # Entry HTML file
├── package.json            # Project metadata and dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/axon-client.git
cd axon-client
npm install
```

### Development Server
Start the dev server:
```bash
npm run dev
```
Then open your browser at:  
👉 `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## ⚠️ Limitations
- Only accepts URLs starting with `http://localhost`
- No persistent storage or saved history
- Not intended for production or remote API testing

---

## 🔒 Security Notice
This tool is designed for **local development only**. Do not use it to test production APIs or submit sensitive information over public networks.

---

## 📜 License
This project is open-source and available under the MIT License.

---

## 👨‍💻 Author
Created by Bazil Suhail
