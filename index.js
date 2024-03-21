import express from "express";
import { MONGODBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing requestbody
app.use(express.json());

// middleware to allow CORS POLICy
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

//book router
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  console.log(req);

  return res.status(200).send("Welcome to mern stack");
});

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening on port no: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
