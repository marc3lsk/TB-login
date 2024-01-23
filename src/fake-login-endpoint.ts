import { InternalAxiosRequestConfig } from "axios";

const fakeLoginEndpoint = (
  config: InternalAxiosRequestConfig<any>,
  email: string,
  password: string,
) => {
  return new Promise<InternalAxiosRequestConfig<any>>((resolve, reject) => {
    if (email === "test@tb.sk" && password === "12345") {
      resolve({
        url: "/",
        method: "GET",
        headers: config.headers,
        data: { message: "Login successful" },
      });
    } else {
      reject({
        response: { data: { message: "Invalid credentials" }, status: 401 },
      });
    }
  });
};

export default fakeLoginEndpoint;
