import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/todo";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
