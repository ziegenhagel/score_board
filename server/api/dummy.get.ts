import mongoose, {Schema} from "mongoose";
import ScoreModel from "./scores.model";

export default defineEventHandler(async (event) => {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    // delete all scores from database
    await ScoreModel.deleteMany({})

    for (let i = 0; i < 50; i++) {
        await ScoreModel.create({
            score: Math.floor(Math.random() * 1000),
            lines: 10,
            level: 10,
            time: '10:00',
            // create random 5-10 char username
            username: Math.random().toString(36).substring(5, 10)
        })
    }

    const funnyNames = ['Klaus', 'Peter', 'Hans', 'Hans-Peter', 'Hans-Dieter', 'Hans-Georg', 'Hans-Jürgen', 'Hans-Joachim', 'Hans-Jochen', 'Hans-Josef', 'Hans-Joseph', 'Hans-Jörg']
    for (let i = 0; i < funnyNames.length; i++) {
        await ScoreModel.create({
            score: Math.floor(Math.random() * 1000),
            lines: 10,
            level: 10,
            time: '10:00',
            // create random 5-10 char username
            username: funnyNames[i]
        })
    }

    // Don't forget to close the connection
    mongoose.connection.close();

    return {success: true}

})
