import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interface";

export interface IEntry extends Entry {}

const EntrySchema: Schema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "Invalid status",
    },
    default: "pending",
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", EntrySchema);

export default EntryModel;
