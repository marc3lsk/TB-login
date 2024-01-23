import axios from "axios";
import fakeLoginEndpoint from "./fake-login-endpoint";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (config.url === "/login" && config.method === "post") {
      return fakeLoginEndpoint(config, config.data.email, config.data.password);
    }
    // Modify the request config here (if needed)
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

export default apiClient;
