import mongoose, {Schema} from "mongoose";
import ScoreModel from "./scores.model";

export default defineEventHandler(async (event) => {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    // delete all scores from database
    let scores = await ScoreModel.deleteMany({});

    // Don't forget to close the connection
    mongoose.connection.close();

    return scores
})
