import { Document } from "mongoose";

export default interface IImage extends Document {
  seq: number;
  portfolioId: number;
  originalname: string;
  location: string;
  mimetype: string;
  size: string;
  key: string;
}