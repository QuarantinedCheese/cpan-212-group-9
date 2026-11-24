import { User } from "../models/User.js";

export async function getFallback() {
    const user = await User.findOne({username: 'testusername1'}).select('id').lean();
    
    return user
};