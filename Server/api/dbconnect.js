import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/scd_profile_db');
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default dbConnect;
