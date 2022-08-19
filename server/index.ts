import express, { Express } from "express";
import router from "./src/routes";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import * as path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
config();

const app: Express = express();
const port = process.env.PORT || 5000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3333",
    methods: ["GET", "POST"],
  },
});

app.use(express.static("../dist"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "/index.html"))
);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.listen(port, () =>
  console.log(`App is listening on the http://localhost:5000`)
);

server.listen(3333, () => {
  console.log(`listening on *:3333`);
});

export default app;
