import mongoose, {Schema} from "mongoose";
import ScoreModel from "./scores.model";

export default defineEventHandler(async (event) => {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    // Read scores from database
    let scores = [];
    try {
        scores = await ScoreModel.find({}).sort({score: 'desc'});
    } catch (error) {
        console.error("Error reading scores from database:", error);
    }


    // Don't forget to close the connection
    mongoose.connection.close();

    return scores
})
