import { Document } from "mongoose";

export default interface IPortfolio extends Document {
  seq: number;
  userId: string;
  title: string;
  site: string;
  buyer: string;
  location: string;
  startDate: Date;
  endDate: Date;
  desc: string;
  ide: string;
  personal: number;
  responsibilities: string;
  responsibilitiesDetail: string;
  finish: string;
}
