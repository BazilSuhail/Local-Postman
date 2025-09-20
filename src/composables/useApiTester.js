import { ref } from "vue";

export function useApiTester() {
  const method = ref("GET");
  const url = ref("http://localhost:3000/api");

  // Headers as key-value
  const headers = ref([{ key: "", value: "" }]);

  // Body (JSON or form fields)
  const body = ref("");
  const includeBody = ref(false);

  // Auth
  const enableAuth = ref(false);
  const token = ref("");

  // File upload
  const enableFile = ref(false);
  const file = ref(null);

  const response = ref(null);
  const status = ref(null);

  const history = ref(JSON.parse(localStorage.getItem("history") || "[]"));

  const sendRequest = async () => {
    try {
      status.value = "loading";
      response.value = null;

      const opts = { method: method.value, headers: {} };

      // Headers from table
      headers.value.forEach(h => {
        if (h.key.trim()) opts.headers[h.key] = h.value;
      });

      // Auth header
      if (enableAuth.value && token.value.trim()) {
        opts.headers["Authorization"] = token.value.startsWith("Bearer ")
          ? token.value
          : `Bearer ${token.value}`;
      }

      // Body & File
      if (["POST", "PUT", "PATCH"].includes(method.value)) {
        if (enableFile.value && file.value) {
          const formData = new FormData();
          formData.append("file", file.value);

          if (includeBody.value && body.value) {
            try {
              const json = JSON.parse(body.value);
              Object.keys(json).forEach(k => formData.append(k, json[k]));
            } catch (err) {
              response.value = { error: `Invalid JSON: ${err.message}` };
              return;
            }
          }
          opts.body = formData;
        } else if (includeBody.value && body.value) {
          opts.body = body.value;
          opts.headers["Content-Type"] = "application/json";
        }
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

      // Save history with auth/file info
      history.value.unshift({
        method: method.value,
        url: url.value,
        hasAuth: enableAuth.value,
        hasFile: enableFile.value,
        date: new Date().toISOString(),
      });
      localStorage.setItem("history", JSON.stringify(history.value.slice(0, 20)));
    } catch (err) {
      response.value = { error: err.message };
    } finally {
      status.value = "done";
    }
  };

  return {
    method,
    url,
    headers,
    body,
    includeBody,
    enableAuth,
    token,
    enableFile,
    file,
    response,
    status,
    history,
    sendRequest,
  };
}
