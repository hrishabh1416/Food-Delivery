import mongoose from "mongoose";
export const connectDB=async function() {
    const DBURL=process.env.ATLASDB_URL;
    try{
        await mongoose.connect(DBURL);
        console.log("Connected to the DB");
    }
    catch(err) {
        console.log(err);
    } 
}
