import mongoose from 'mongoose';
import { connectDb } from '../src/db.js';
import { User } from '../src/models/User.js';
// import { Favourite } from '../src/models/Favourite.js';


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

// TODO: HANDLE FAVS
// TODO: HANDLE ARTWORKS (?)

console.log(`Removed ${deleted.deletedCount} users, inserted ${inserted.length}`);

// Close connection
await mongoose.disconnect();