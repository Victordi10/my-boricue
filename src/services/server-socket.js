import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { guardarMensaje } from "../lib/models/chatModel.js";


const app = express();
const port = 4000; // puerto distinto al 3000 de Next.js

app.use(cors({
    origin: "http://localhost:3000", // o usa "*" en desarrollo
    methods: ["GET", "POST"]
}));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // tu app Next.js  origin: "http://localhost:3000 process.env.NEXT_PUBLIC_API_URL" 
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("🟢 Usuario conectado Socket.IO");

    socket.on("send-message", async (msg) => {
        //console.log("📨 Mensaje recibido:", msg);

        const { idEmisor, idReceptor, mensaje, url_archivo } = msg;

        // 🛡️ Validación básica
        if (
            typeof idEmisor !== 'string' ||
            typeof idReceptor !== 'number' ||
            (!mensaje && !url_archivo) ||
            (mensaje && typeof mensaje !== 'string') ||
            (url_archivo && typeof url_archivo !== 'string')
        ) {
            console.warn("⚠️ Datos inválidos recibidos:", msg);
            socket.emit("error-message", { error: "Datos del mensaje inválidos." });
            return;
        }

        try {
            // Lógica para guardar el mensaje
            await guardarMensaje(idEmisor, idReceptor, mensaje, url_archivo || null);

            // Emitir el mensaje a otros usuarios
            socket.broadcast.emit("receive-message", msg);
        } catch (error) {
            console.error("❌ Error al guardar el mensaje:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 Usuario desconectado Socket.IO");
    });
});

httpServer.listen(port, () => {
    console.log(`🚀 Socket.IO server corriendo en http://localhost:${port}`);
});
