import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import http from "http";
import socketIO from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(
  bodyParser.urlencoded({
    parameterLimit: 52428800,
    limit: "50mb",
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));

app.use("/", routes);

io.on("connection", (socket) => {
  socket.on("CONNECT", (data) => {
    socket.join(data);
  });
  socket.on("ADD_MESSAGE", (data) => {
    socket.to(data.chat._id).broadcast.emit("ADD_MESSAGE", data);
  });
});

app.use((req, res) => {
  res.status(404).send({ status: 404, url: `${req.originalUrl} not found` });
});

server.listen(process.env.PORT, () => console.log("started"));
