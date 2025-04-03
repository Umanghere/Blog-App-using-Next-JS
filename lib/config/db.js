import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://umangbansalhere:umangbansalhere@cluster0.qkoimun.mongodb.net/blog-app")
    console.log("DB Connected");   
}