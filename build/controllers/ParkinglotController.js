"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parkinglot_1 = __importDefault(require("../models/Parkinglot"));
const createParkingLot = (req, res, next) => {
    const { ParkingID } = req.body;
    const parkingLot = new Parkinglot_1.default({
        ParkingID,
        ParkingTaken: true,
    });
    return parkingLot
        .save()
        .then((parkingLot) => res.status(201).json({ parkingLot }))
        .catch((error) => res.status(500).json({ error }));
};
const readParkingLot = (req, res, next) => {
    const parkingLotID = req.params.ParkingID;
    return Parkinglot_1.default.findOne({ ParkingID: parkingLotID })
        .then((parkingLot) => parkingLot
        ? res.status(200).json({ parkingLot })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllParkingLot = (req, res, next) => {
    return Parkinglot_1.default.find()
        .then((parkingLots) => res.status(200).json({ parkingLots }))
        .catch((error) => res.status(500).json({ error }));
};
const updateParkingLot = (req, res, next) => {
    const parkingLotID = req.params.ParkingID;
    return Parkinglot_1.default.findOne({ ParkingID: parkingLotID })
        .then((parkingLot) => {
        if (parkingLot) {
            parkingLot.set(req.body);
            return parkingLot
                .save()
                .then((parkingLot) => res.status(201).json({ parkingLot }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteParkingLot = (req, res, next) => {
    const parkingLotID = req.params.ParkingID;
    console.log(parkingLotID);
    return Parkinglot_1.default.findOneAndDelete({ ParkingID: parkingLotID })
        .then((parkingLot) => parkingLot
        ? res.status(200).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createParkingLot,
    readParkingLot,
    readAllParkingLot,
    updateParkingLot,
    deleteParkingLot,
};
