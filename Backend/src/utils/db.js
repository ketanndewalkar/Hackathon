import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()


const connectDb = async () => {
    try {
       
        await mongoose.connect("mongodb+srv://Rushi:MongoDb1234@cluster0.qk2d6rf.mongodb.net/KrathosX")
        console.log("Database Connected Successfully!")
    }
    catch (error) {
        console.log("Error connecting to database: ", error)
    }   
}

export default connectDb;