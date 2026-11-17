import mongoose from 'mongoose';


const userSchema = new mongoose.Scheme(
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

export const User = mongoose.model('User', userSchema);