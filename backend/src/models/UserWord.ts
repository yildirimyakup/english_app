import mongoose, { Document, Schema } from "mongoose";

export interface IUserWord extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  wordId: mongoose.Schema.Types.ObjectId;
  strength: number; // kelimenin öğrenilme gücü (ör. 1–5)
  lastReviewed: Date;
}

const userWordSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wordId: { type: Schema.Types.ObjectId, ref: "Word", required: true },
    strength: { type: Number, default: 1 }, // her doğru tekrarda artırılabilir
    lastReviewed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IUserWord>("UserWord", userWordSchema);
