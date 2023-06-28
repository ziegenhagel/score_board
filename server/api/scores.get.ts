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


    // to mock some data return 50 times the same score
    // let scoresMock = []
    // for (let i = 0; i < 50; i++) {
    //     scoresMock.push({
    //         score: Math.floor(Math.random() * 1000),
    //         lines: 10,
    //         level: 10,
    //         time: '10:00',
    //         username: 'Thisdworks'
    //     })
    // }
    // return scoresMock
    //

    return scores
})
