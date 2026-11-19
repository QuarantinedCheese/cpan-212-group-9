
import { HttpError } from '../utils/http-error.js';
import { User } from "../models/User.js";

// req is the user request, res is the response we are building with each function

export async function listUsers(req, res) {
    const {username, q} = req.query
    // Shouldn't have to verify that username exists, but for artworks/favourites,
    // may be worth replacing 'username' with something like 'genre'.
    // May need to create a list of possible genres in the appropriate validators.

    // Search Validation
    if (q !== undefined && typeof q !== 'string') {
        throw new HttpError(400, 'invalid query', {q: 'Send q only once'});
    }

    const filter = {};

    if (username) {
        filter.username = username;
    }
    if (q) {
        filter.username = { $regex: q, $options: 'i'};
    }

    const users = await User.find(filter);
    res.json({ data: users });
}

export async function getUser(req, res) {
    // Finds user by ID and throws an error if it fails to find user.
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new HttpError(404, 'User not found.');
    }
    res.json({data: user});
}

export async function createUser(req, res) {
    // Creates new user based on request
    const user = await User.create(req.body);
    res.location(`/api/users/${user.id}`).status(201).json({data: user});
}

export async function updateUser(req, res) {
    // Updates user profile based on the request
    const user = await User.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    if (!user) {
        throw new HttpError(404, 'User not found.');
    }
    res.json({data: user});
}

export async function deleteUser(req, res) {
    const deleted = await User.findByIdAndDelete(req.params.id);
    // Deletes the user profile
    if (!deleted) {
        throw new HttpError(404, 'User not found.');
    }
    res.status(204).end();
}