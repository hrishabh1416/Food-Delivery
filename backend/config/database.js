import mongoose from "mongoose";
export const connectDB=async function() {
    // const MONGODBURL="mongodb://127.0.0.1:27017/fooddelivery";
    const DBURL=process.env.ATLASDB_URL;
    try{
        // await mongoose.connect(MONGODBURL);
        await mongoose.connect(DBURL);
        console.log("Connected to the DB");
    }
    catch(err) {
        console.log(err);
    } 
}
