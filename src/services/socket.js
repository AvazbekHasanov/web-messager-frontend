import { io } from "socket.io-client";

export function createSocket() {
  const socket = io("http://localhost:8080/", {
    transports: ["websocket"],
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected from server:", reason);

    if (reason === "io server disconnect") {
      socket.connect(); 
    }
  });

  return socket;
}
