import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 4000; // puerto distinto al 3000 de Next.js

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NEXT_PUBLIC_API_URL, // tu app Next.js
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("🟢 Usuario conectado Socket.IO");

    socket.on("send-message", (msg) => {
        console.log("📨 Mensaje recibido:", msg);
        socket.broadcast.emit("receive-message", msg);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Usuario desconectado Socket.IO");
    });
});

httpServer.listen(port, () => {
    console.log(`🚀 Socket.IO server corriendo en http://localhost:${port}`);
});
