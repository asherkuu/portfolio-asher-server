import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

/*
    Route
*/
app.use("/api/v1", require("./routes"));

const mongURI = process.env.MONGO_URI;
mongoose.connect(mongURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Connect Success");
});

mongoose.connection.on("error", (error) => {
  console.log("error", error);
});

app.listen(process.env.PORT, () => {
  console.log("Listening on " + process.env.PORT);
});
