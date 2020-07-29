import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res) => {
	res.status(404).send({ status: 404, url: `${req.originalUrl} not found` });
});

app.listen(process.env.PORT, () => console.log("started"));
