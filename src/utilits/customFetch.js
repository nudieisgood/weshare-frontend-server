import axios from "axios";

// export const backendBaseURL = "http://127.0.0.1:5100";
export const backendBaseURL = "http://localhost:5100";
// export const backendBaseURL = "https://airbnb-backend-server.onrender.com";

const customFetch = axios.create({
  baseURL: backendBaseURL + "/api/v1",

  withCredentials: true,
});

export default customFetch;
