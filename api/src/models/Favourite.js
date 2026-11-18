import mongoose from 'mongoose';

// Scheme is the list of rules for each field
// Mongoose checks these before saving. Replaces the validators
const favSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            trim: true,
            minlength: [1, 'Title must be at least one character.'],
        },
        artist: {
            type: String,
            trim: true,
            minlength: [1, 'Artist name must be at least one character'],
            default: 'N/A',
        },
        instituteID: {
            type: String,
            required: [true, 'Institute ID must exist.'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A user is required.'],
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [2000, 'Notes must be 2000 characters or less'],
            default: '',

        }
    },
    {
        timestamps: {createdAt: true, updatedAt: true},
        toJSON: {
            // res.json() calls this for every fav. MongoDB calls the id "_id", web expects "id"
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