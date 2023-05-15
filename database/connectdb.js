import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URI) 
    console.log('Connected to mongodb ok')   
} catch (error) {
    console.log('Error connecting to mongodb:' + error)
}

