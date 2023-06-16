import ScoreModel from "./scores.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {


    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    const body = await readBody(event)

    // Add new score to database
    let newScore = new ScoreModel(body);
    newScore = await newScore.save();

    // Get all scores
    const scores = await ScoreModel.find({}).sort({score: 'desc'}); // Sort scores in descending order

    // Check which index the new score is at
    const index = scores.findIndex((score) => score.score === body.score);

    mongoose.connection.close();

    return {
        scores,
        index,
    }
})
