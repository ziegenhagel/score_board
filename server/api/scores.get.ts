import mongoose, {Schema} from "mongoose";

const ScoreSchema = new Schema({
    name: String,
    score: Number,
    level: Number,
    lines: Number,
    time: String,
})

export const Score = mongoose.model('score', ScoreSchema)

export default defineEventHandler(async (event) => {
    return await Score.find().sort({score: -1}).limit(10).lean().exec()
})
