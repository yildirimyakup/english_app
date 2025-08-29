import mongoose, { Schema, Document } from "mongoose";
export interface IWord extends Document {
  english: string;
  turkish: string;
  level: "easy" | "medium" | "hard";
  example?: string;
  audio?: string;
  pos?: string;
  tags?: string[];
  synonyms?: string[];
  antonyms?: string[];
  phonetic?: string;
  xpValue: number;
  frequency: "low" | "medium" | "high";
  addedBy?: mongoose.Schema.Types.ObjectId;
}

const wordSchema: Schema = new Schema(
  {
    english: { type: String, required: true },
    turkish: { type: String, required: true },
    level: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    example: { type: String },
    audio: { type: String }, // buraya dosya yolu veya URL gelecek
    pos: { type: String }, // noun, verb, adjective...
    tags: [{ type: String }],
    synonyms: [{ type: String }],
    antonyms: [{ type: String }],
    phonetic: { type: String },
    xpValue: { type: Number, default: 10 },
    frequency: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IWord>("Word", wordSchema);
