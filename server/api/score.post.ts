import ScoreModel from "./scores.model";
import mongoose from "mongoose";
import {create, OpenAIGPT3} from 'openai';

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
}
const openai = new create(process.env.OPENAI_API_KEY);

export default defineEventHandler(async (event) => {


    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    const body = await readBody(event)

    // Check username
    const response = await openai.complete({
        engine: 'davinci',
        prompt: `Prüfe Username '${body.name}'. Ist er akzeptabel oder anstößig? Antworte mit eine der folgenden antworten: USERNAME_VALID oder USERNAME_BAN.`,
        maxTokens: 5,
    });

    // check if String USERNAME_VALID is in response
    if (!response.choices[0].text.includes('USERNAME_VALID')) {
        return {error: 'Username is considered inappropriate.', success: false, response}
    }

    // Add new score to database
    let newScore = new ScoreModel(body);
    newScore = await newScore.save();

    // Get all scores
    const scores = await ScoreModel.find({}).sort({score: 'desc'}); // Sort scores in descending order

    // Check which index the new score is at
    const index = scores.findIndex((score) => score.score === body.score);

    mongoose.connection.close();

    return {
        success: true,
        scores,
        index,
        response
    }
})
