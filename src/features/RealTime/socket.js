import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const getToken = () => Cookies.get("_auth");

export const chatSocket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  autoConnect: false,
  auth: (cb) => {
    const token = getToken();
    console.log("Socket auth token:", token ? "Token found" : "No token");
    cb({ token });
  },
  extraHeaders: {
    Authorization: `Bearer ${getToken() || ""}`
  },
  query: {
    token: getToken() || ""
  }
});

// Add error handler
chatSocket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
  console.error("Socket connection error details:", error);
});
