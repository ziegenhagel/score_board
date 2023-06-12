import mongoose from 'mongoose';

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/nextjs';

export default async function () {
    console.log('Connecting to MongoDB...');
    console.log('mongoURI', mongoURI);
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
