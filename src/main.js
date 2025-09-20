// src/main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import './style.css'

import Home from "./components/Home.vue";
import HistoryView from "./components/HistoryView.vue";

// Define routes here
const routes = [
  { path: "/", component: Home },
  { path: "/history", component: HistoryView },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");

// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
