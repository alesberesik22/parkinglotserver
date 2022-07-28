import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Parkinglot from "../models/Parkinglot";

const createParkingLot = (req: Request, res: Response, next: NextFunction) => {
  const { ParkingID } = req.body;

  const parkingLot = new Parkinglot({
    ParkingID,
    ParkingTaken: true,
  });
  return parkingLot
    .save()
    .then((parkingLot) => res.status(201).json({ parkingLot }))
    .catch((error) => res.status(500).json({ error }));
};
const readParkingLot = (req: Request, res: Response, next: NextFunction) => {
  const parkingLotID = req.params.ParkingID;

  return Parkinglot.findOne({ ParkingID: parkingLotID })
    .then((parkingLot) =>
      parkingLot
        ? res.status(200).json({ parkingLot })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAllParkingLot = (req: Request, res: Response, next: NextFunction) => {
  return Parkinglot.find()
    .then((parkingLots) => res.status(200).json({ parkingLots }))
    .catch((error) => res.status(500).json({ error }));
};
const updateParkingLot = (req: Request, res: Response, next: NextFunction) => {
  const parkingLotID = req.params.ParkingID;

  return Parkinglot.findOne({ ParkingID: parkingLotID })
    .then((parkingLot) => {
      if (parkingLot) {
        parkingLot.set(req.body);

        return parkingLot
          .save()
          .then((parkingLot) => res.status(201).json({ parkingLot }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteParkingLot = (req: Request, res: Response, next: NextFunction) => {
  const parkingLotID = req.params.ParkingID;
  console.log(parkingLotID);

  return Parkinglot.findOneAndDelete({ ParkingID: parkingLotID })
    .then((parkingLot) =>
      parkingLot
        ? res.status(200).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createParkingLot,
  readParkingLot,
  readAllParkingLot,
  updateParkingLot,
  deleteParkingLot,
};
