"use strict";
// import Joi, { ObjectSchema } from "joi";
// import { NextFunction, Request, Response } from "express";
// import Logging from "../library/Logging";
// import { IParkinglot } from '../models/Parkinglot';
// export const ValidateSchema = (schema: ObjectSchema) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validateAsync(req.body);
//     } catch (error) {
//       Logging.error(error);
//       return res.status(422).json({ error });
//     }
//   };
// };
// export const Schemas => {
//     parkingLot: {
//         create: Joi.object<IParkinglot>({
//             ParkingID: Joi.number().required(),
//             ParkingTaken: Joi.boolean()
//         })
//     }
// }
//https://www.youtube.com/watch?v=72_5_YuDCNA&list=PLVpjIZjyMjJjTwxCp1y25W4nqTTqjObBF&index=41&t=2550s&ab_channel=TheNerdyCanuck
