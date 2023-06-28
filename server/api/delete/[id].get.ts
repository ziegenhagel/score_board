
import mongoose from "mongoose";
import ScoreModel from "../scores.model";
//import {Configuration, OpenAIApi} from "openai"
// import const { Configuration, OpenAIApi } = require("openai");

export default defineEventHandler(async (event) => {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    const score = await ScoreModel.findByIdAndDelete(event.context.params.id)

    mongoose.connection.close();

    return {
        success: true,
        score

    }
})
