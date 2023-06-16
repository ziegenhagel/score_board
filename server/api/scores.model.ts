import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    score: Number,
    lines: Number,
    level: Number,
    time: String,
    username: String,
});

const ScoreModel = mongoose.model('Score', ScoreSchema);

export default ScoreModel;
