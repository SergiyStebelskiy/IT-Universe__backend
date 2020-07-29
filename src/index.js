import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res) => {
  res.status(404).send({status: 404, url: `${req.originalUrl} not found`})
})

app.listen(process.env.PORT, () => console.log("started"))