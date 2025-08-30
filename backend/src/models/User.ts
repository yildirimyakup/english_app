import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  surename: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  money: number;
  energy: number;
  verified: boolean;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    surename: { type: String },
    avatar: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
    energy: { type: Number, default: 100 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
