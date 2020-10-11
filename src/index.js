import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
app.use(cors());
app.use(
	bodyParser.urlencoded({
		parameterLimit: 500000,
		limit: "50mb",
		extended: true
	})
);
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use("/", routes);

app.use((req, res) => {
	res.status(404).send({ status: 404, url: `${req.originalUrl} not found` });
});

app.listen(process.env.PORT, () => console.log("started"));
