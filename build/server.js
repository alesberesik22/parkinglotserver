"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Parkinglotroutes_1 = __importDefault(require("./routes/Parkinglotroutes"));
const router = (0, express_1.default)();
/*Connect to Mongoose */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("connected to monogoDB");
    startServer();
})
    .catch((error) => {
    Logging_1.default.error("Unable to connect to mongoDB");
    Logging_1.default.error(error);
});
const startServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming -> method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            Logging_1.default.info(`Incoming -> method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${req.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    /*Routes */
    router.use("/parkinglot/", Parkinglotroutes_1.default);
    /*Health check */
    router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));
    router.use((req, res, next) => {
        const error = new Error("not found");
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => Logging_1.default.info("Server is running"));
};
