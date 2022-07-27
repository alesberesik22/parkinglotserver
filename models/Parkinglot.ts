import mongoose, { Document, Schema } from "mongoose";

export interface IParkinglot {
  ParkingID: Number;
  ParkingTaken: Boolean;
}

export interface IParkinglotModel extends IParkinglot, Document {}

const ParkinglotSchema: Schema = new Schema(
  {
    ParkingID: { type: Number, required: true },
    ParkingTaken: { type: Boolean },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IParkinglotModel>("Parkinglot", ParkinglotSchema);
