import express from "express";
import ParkinglotController from "../controllers/ParkinglotController";

const router = express.Router();

router.post("/create", ParkinglotController.createParkingLot);
router.get("/get/:ParkingID", ParkinglotController.readParkingLot);
router.get("/get", ParkinglotController.readAllParkingLot);
router.patch("/update/:ParkingID", ParkinglotController.updateParkingLot);
router.delete("/delete/:ParkingID", ParkinglotController.deleteParkingLot);

export = router;
