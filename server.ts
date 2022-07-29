import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import Parkinglotroutes, { route } from "./routes/Parkinglotroutes";

const router = express();

/*Connect to Mongoose */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("connected to monogoDB");
    startServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect to mongoDB");
    Logging.error(error);
  });

const startServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incoming -> method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Incoming -> method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${req.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /*Routes */
  router.use("/parkinglot/", Parkinglotroutes);
  /*Health check */

  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(process.env.PORT || 8000, () => Logging.info("Server is running"));
};
