"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ParkinglotController_1 = __importDefault(require("../controllers/ParkinglotController"));
const router = express_1.default.Router();
router.post("/create", ParkinglotController_1.default.createParkingLot);
router.get("/get/:ParkingID", ParkinglotController_1.default.readParkingLot);
router.get("/get", ParkinglotController_1.default.readAllParkingLot);
router.patch("/update/:ParkingID", ParkinglotController_1.default.updateParkingLot);
router.delete("/delete/:ParkingID", ParkinglotController_1.default.deleteParkingLot);
module.exports = router;
