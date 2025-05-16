const isLocalhost = window.location.hostname === "localhost";

export const environment = {
  apiUrl: isLocalhost
    ? "http://localhost:5000/api"
    : "https://nexgestapi.onrender.com/api",
};