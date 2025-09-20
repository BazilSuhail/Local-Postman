<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1 p-6 space-y-6">
      <RequestForm />
      <ResponseView />
      <HistoryView />
    </main>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { useApiTester } from "./composables/useApiTester";
import Sidebar from "./components/Sidebar.vue";
import RequestForm from "./components/RequestForm.vue";
import ResponseView from "./components/ResponseView.vue";
import HistoryView from "./components/HistoryView.vue";

const api = useApiTester();
provide("api", api);
</script>
