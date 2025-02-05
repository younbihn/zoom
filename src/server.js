import http from "http";
import WebSocket from "ws";
import express from "express";
import { Socket } from "dgram";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("Disconnected from Browser");
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Conneted to Browser");
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        if (message instanceof Buffer) {
            const text = message.toString("utf-8");
            console.log("Received:", text);
            sockets.forEach(aSocket => aSocket.send(text));
        } else {
            console.log("Received non-buffer message:", message);
            sockets.forEach(aSocket => aSocket.send(text));
        }
    });
});

server.listen(3000, handleListen);