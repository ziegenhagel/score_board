import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    username: String,
    score: Number
});

const ScoreModel = mongoose.model('Score', ScoreSchema);

export default ScoreModel;
