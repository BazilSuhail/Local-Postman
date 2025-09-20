import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";

// Views
import HomeView from "./views/HomeView.vue";
import HistoryView from "./views/HistoryView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/history", component: HistoryView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");


// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
