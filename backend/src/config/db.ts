import mongoose from "mongoose";
const TAG = "src/config/db.ts :";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(TAG, "✅ MongoDB connected");
  } catch (error: any) {
    console.log(TAG, "❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
