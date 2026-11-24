import mongoose from 'mongoose';
import { connectDb } from '../src/db.js';
import { User } from '../src/models/User.js';
import { Favourite } from '../src/models/Favourite.js';


// Same sample data from users data
// No ID needed, since mongoDB handles that.
const sampleUsers = [
    {
        username: 'TestUsername1',
        email: 'TestUserEmail1@gmail.com',
        createdAt: '2020-03-02T14:00:00.023Z'
    },
    {
        username: 'TestUsername2',
        email: 'TestUserEmail2@gmail.com',
        createdAt: '2021-05-02T18:20:21.123Z',
    },
    {
        username: 'TestUsername3',
        email: 'TestUserEmail3@hotmail.com',
        createdAt: '2021-11-23T10:12:34.245Z',
    },
    {
        username: 'TestUsername4',
        email: 'TestUserEmail4@gmail.com',
        createdAt: '2021-01-10T03:34:32.313Z'
    }
];

await connectDb();

// Start from empty
const deleted = await User.deleteMany({});
// insertMany() also checks schema rules, any typos above will not create issues.
const inserted = await User.insertMany(sampleUsers);
export const fallBackUser = inserted[0];

const sampleFavourites = [
    {
        title: 'A Sunday on La Grande Jatte',
        artist: 'Georges Seurat',
        instituteID: '27992',
        userId: inserted[0]._id,
        notes: 'abc',
    },
    {
        title: 'The Cowherd',
        artist: 'Claude Lorrain',
        instituteID: '28401',
        userId: inserted[1]._id,
        notes: 'A favourite artwork.',
    },
    {
        title: 'The Apse of Notre-Dame, Paris',
        artist: 'Ferdinand Jules Albert Gosselin',
        instituteID: '28412',
        userId: inserted[2]._id,
        notes: 'Notre Dame.',
    },
];


const deletedFavourites = await Favourite.deleteMany({});
const insertedFavourites = await Favourite.insertMany(sampleFavourites);

// TODO: HANDLE ARTWORKS (?)

console.log(`Removed ${deleted.deletedCount} users, ${deletedFavourites.deletedCount} favourites, inserted ${inserted.length} users and ${insertedFavourites.length} favorites`);

// Close connection
await mongoose.disconnect();