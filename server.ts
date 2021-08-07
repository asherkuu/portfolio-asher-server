import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 24000 * 60 * 60 },
  })
);

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
