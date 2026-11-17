import mongoose from 'mongoose';

// Scheme is the list of rules for each field
// Mongoose checks these before saving. Replaces the validators
const userSchema = new mongoose.Scheme(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            lowercase: true,
            minlength: [5, 'Username must be 5 to 30 chars.'],
            maxlength: [30, 'Username must be 5 to 30 chars.'],
            validate: {validator: v => /^\S+@\S+\.\S+$/.test(v), message: 'Invalid address'},
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
        }
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

export const User = mongoose.model('User', userSchema);