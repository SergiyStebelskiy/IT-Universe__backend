import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import http from "http";
import socketIO from "socket.io";
import { User } from "./models/User";

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

let users = [];

io.on("connection", (socket) => {
  socket.on("CONNECT", async (email) => {
    const alreadyConnected = users.filter(
      (e) => e.email === email && e.socket_id === socket.id
    ).length;
    const user = await User.find({ email }).select("-password");
    if (!alreadyConnected) {
      const newUsers = [
        ...users.filter((e) => e.email !== email),
        {
          ...user[0].toObject(),
          socket_id: socket.id,
        },
      ];
      users = newUsers;
      newUsers.map((user) => {
        socket.to(user.socket_id).emit("ONLINE_USERS", newUsers);
      });
      await User.updateOne({ email }, { $set: { online: true } });
    }
  });
  socket.on("ADD_MESSAGE", (data) => {
    const recipient = users.filter((e) => e.email === data.recipient)[0];
    socket.to(recipient.socket_id).emit("ADD_MESSAGE", data.message);
  });
  socket.on("disconnect", async () => {
    const user = users.filter((e) => e.socket_id === socket.id)[0];
    const newUsers = users.filter((e) => e.socket_id !== socket.id);
    users = newUsers;
    newUsers.map(async (user) => {
      socket.to(user.socket_id).emit("ONLINE_USERS", newUsers);
    });
    await User.updateOne({ email: user?.email }, { $set: { online: false } });
  });
});

app.use((req, res) => {
  res.status(404).send({ status: 404, url: `${req.originalUrl} not found` });
});

server.listen(process.env.PORT, () => console.log("started"));
