import mongoose from 'mongoose';
export const connectDB = async () => {
  const DBURL = process.env.ATLASDB_URL;
  console.log("Connecting to:", DBURL);  // Add this line
  try {
    await mongoose.connect(DBURL);
    console.log("Connected to the DB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

