import mongoose, { Schema } from "mongoose";
import IImage from "../interfaces/image";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const ImageSchema: Schema<IImage> = new Schema(
  {
    seq: { type: Number, required: true },
    portfolioId: { type: Number, required: true },
    originalname: { type: String, maxLength: 1000, required: true },
    location: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true},
    key: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

ImageSchema.plugin(autoIncrement.plugin, {
  model: "Images",
  field: "seq",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = mongoose.model<IImage>("Images", ImageSchema);
