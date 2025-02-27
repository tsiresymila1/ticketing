"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;
export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server:", socketInstance.id);
    });
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return socket;
}
