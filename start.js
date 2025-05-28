import { spawn } from "child_process";

function runProcess(command, args, name) {
    const proc = spawn(command, args, { stdio: "inherit" });

    proc.on("close", (code) => {
        console.log(`${name} terminado con código ${code}`);
    });

    proc.on("error", (err) => {
        console.error(`Error en ${name}:`, err);
    });

    return proc;
}

// Levantar Next.js (modo dev)
const nextProcess = runProcess("pnpm", ["next", "dev"], "Next.js");

// Levantar servidor Socket.IO
const socketProcess = runProcess("node", ["server-socket.js"], "Socket.IO");

// Opcional: si cerrás la terminal, querés matar ambos procesos juntos
process.on("SIGINT", () => {
    nextProcess.kill();
    socketProcess.kill();
    process.exit();
});
