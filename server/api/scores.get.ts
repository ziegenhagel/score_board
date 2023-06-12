import mongoose, {Schema} from "mongoose";
import * as fs from "fs";

const filename = "scores.json"


const ScoreSchema = new Schema({
    name: String,
    score: Number,
    level: Number,
    lines: Number,
    time: String,
})

export const Score = mongoose.model('score', ScoreSchema)

export default defineEventHandler(async (event) => {
    // Read scores from file
    let scores = [];
    try {
        const fileContent = await fs.readFileSync(filename, "utf8")
        scores = JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading scores file:", error);
    }

    return scores
})
