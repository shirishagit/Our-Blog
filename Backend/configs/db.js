import mongoose from "mongoose";


export const connectDB = async (MONGOBD_URL) => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Mongoose connected to DB");
        }
        );
        await mongoose.connect(`${process.env.MONGOBD_URL}/ourBlog`);
        } catch (error) {
        console.log("Error connecting to DB", error);
    }

            
           
}
