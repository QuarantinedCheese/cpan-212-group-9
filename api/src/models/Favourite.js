import mongoose from 'mongoose';

// Scheme is the list of rules for each field
// Mongoose checks these before saving. Replaces the validators
const favSchema = new mongoose.Schema(
    {
        
    },
    {
        timestamps: {createdAt: true, updatedAt: false},
        toJSON: {
            // res.json() calls this for every user. MongoDB calls the id "_id", web expects "id"
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    },
);

export const Favourite = mongoose.model('Favourite', favSchema);