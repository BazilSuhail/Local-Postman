import { ref } from "vue";

export function useApiTester() {
  const method = ref("GET");
  const url = ref("http://localhost:3000/api");
  const headers = ref([{ key: "", value: "" }]);
  const body = ref("");
  const response = ref(null);
  const status = ref(null);
  const history = ref(JSON.parse(localStorage.getItem("history") || "[]"));

  const sendRequest = async () => {
    try {
      status.value = "loading";
      response.value = null;

      const opts = { method: method.value, headers: {} };

      headers.value.forEach(h => {
        if (h.key.trim()) opts.headers[h.key] = h.value;
      });

      if (["POST", "PUT", "PATCH"].includes(method.value) && body.value) {
        opts.body = body.value;
        opts.headers["Content-Type"] = "application/json";
      }

      const res = await fetch(url.value, opts);
      const text = await res.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }

      response.value = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: parsed,
      };

      // Save to history
      history.value.unshift({
        method: method.value,
        url: url.value,
        date: new Date().toISOString(),
      });
      localStorage.setItem("history", JSON.stringify(history.value.slice(0, 20)));
    } catch (err) {
      response.value = { error: err.message };
    } finally {
      status.value = "done";
    }
  };

  return { method, url, headers, body, response, status, history, sendRequest };
}
