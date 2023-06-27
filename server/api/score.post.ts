import ScoreModel from "./scores.model";
import mongoose from "mongoose";
//import {Configuration, OpenAIApi} from "openai"
// import const { Configuration, OpenAIApi } = require("openai");

export default defineEventHandler(async (event) => {

   /*    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY environment variable is not set");
    }

 const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });*/
//    const openai = new OpenAIApi(configuration);

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    const body = await readBody(event)
    const {username} = body
/*
    try {
        const completion = await openai.createCompletion({
            model: "text-ada-001",
            prompt: `Prüfe Username '${username}'. Ist er akzeptabel oder anstößig? Antworte mit eine der folgenden antworten: USERNAME_VALID oder USERNAME_BAN.`,
        });
        console.log(completion.data.choices)
        if (!completion.data.choices[0].text.includes('USERNAME_VALID')) {
            return {
                success: false,
                error: 'Username is considered inappropriate.',
                response: completion.data.choices[0].text
            }
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
*/
    const response = {}

    //
    // const response = await openai.complete({
    //     engine: 'davinci',
    //     prompt: `Prüfe Username '${username}'. Ist er akzeptabel oder anstößig? Antworte mit eine der folgenden antworten: USERNAME_VALID oder USERNAME_BAN.`,
    //     maxTokens: 5,
    // });

    // check if String USERNAME_VALID is in response
    // if (!response.choices[0].text.includes('USERNAME_VALID')) {
    //     return {error: 'Username is considered inappropriate.', success: false, response}
    // }

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
        index
    }
})
