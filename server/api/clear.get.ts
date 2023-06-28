import mongoose, {Schema} from "mongoose";
import ScoreModel from "./scores.model";

export default defineEventHandler(async (event) => {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    // delete all scores from database
    let scores = await ScoreModel.deleteMany({});

    // inset a single score
    // await ScoreModel.create({
    //     score: 10,
    //     lines: 10,
    //     level: 10,
    //     time: '10:00',
    //     // create random 5-10 char username
    //     username: 'Rainer Zufall'
    // })
    //
    // Don't forget to close the connection
    mongoose.connection.close();

    return {success: true}
})
