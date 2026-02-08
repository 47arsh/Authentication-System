import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.mongo_uri!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("mongoDB connected successfully");
        })
        connection.on('error', (err) => {
            console.log("connection error, please make sure mongoDB is running");
            console.log(err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong!");
        console.log(error);
    }
}