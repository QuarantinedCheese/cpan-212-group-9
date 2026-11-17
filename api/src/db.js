import mongoose from 'mongoose';

mongoose.set('sanitizeFilter', true);

// Connects to the mongodb database string in .env
// server.js and scripts/seed.js call this first.
export async function connectDb() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI is not set. Copy .env.example to .env and put the connection string in it.');
        process.exit(1);
    }

    try {
        // Give up after 10 secs
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 } );
    } catch (error) {
        console.error('Unable to connect to MongoDB: ' + error.message);
        process.exit(1);
    }

    console.log(`Connected to MongoDB successfully, database: "${mongoose.connection.name}"`);
}