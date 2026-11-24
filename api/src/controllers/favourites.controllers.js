// TODO: control favourites (?)

import { HttpError } from "../utils/http-error.js";
import { Favourite } from "../models/Favourite.js";
import { getFallback } from "../utils/fallbackUser.js";
import mongoose from "mongoose";

export async function createFavouriteController (req, res) {
    const devTestUser = await getFallback();
    const favourite = await Favourite.create({...req.body, userId: devTestUser._id});

    res.location(`/api/favourites/${favourite.id}`)
    .status(201)
    .json({ data : favourite});
}

function escapeRegex(value) {
    return value.split('').map(char => '.*+?^${}()|[]\\'.includes(char) ? '\\' + char : char
 ).join('');
}
export async function findFavouritesController (req, res) {
    const page = Number(req.query.page ?? 1);

    if (!Number.isInteger(page) || page < 1) {
        throw new HttpError(400, 'Invalid page number.', {
            page: 'Page must be a positive whole number.'
        });
    }
    const limit = Number(req.query.limit ?? 10);

    if (!Number.isInteger(limit) || limit < 1) {
        throw new HttpError(400, 'Invalid limit.', {
            limit: 'Limit must be a positive number.'
        });
    }

    if (limit > 50) {
        throw new HttpError(400, 'Limit too large.', {
            limit: 'Maximum limit is 50.'
        });
    }
    
    const { userId } = req.query;
    const { search } = req.query;
    const { sort } = req.query;

    const allowedSortFields = ['title', 'artist', 'createdAt'];

    if (sort) {
        const field = sort.startsWith('-') ? sort.slice(1) : sort;

        if (!allowedSortFields.includes(field)) {
            throw new HttpError(400, 'Invalid sort field.', {
                sort: 'This sort field is not allowed.'
            });
        }
    }
    const filter = {};

    if (search) {
        filter.title = new RegExp(escapeRegex(search), 'i');
    }
    if (userId) {
        filter.userId = userId
    }

    const total = await Favourite.countDocuments(filter);

    const sortOptions = {};

    if (sort) {
        const field = sort.startsWith('-') ? sort.slice(1) : sort;
        sortOptions[field] = sort.startsWith('-') ? -1 : 1;
    }
    const favourites = await Favourite.find(filter)
        .populate('userId')
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({ data: favourites, total, pages: Math.ceil(total / limit), });
}

export async function getFavouriteById(req, res) {
    const favourite = await Favourite.findById(req.params.id)
    .populate('userId');

    if (!favourite) {
        throw new HttpError(404, 'Favourite not found.');
    }

    res.json({ data: favourite });
}

export async function updateFavouriteController (req, res) {
    const favourite = await Favourite.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
        }
    ).populate("userId");
    

    if (!favourite) {
        throw new HttpError(404, "Favourite not found.");
    }
    res.json({ data: favourite});
}

export async function deleteFavouriteController(req, res) {
    const deleted = await Favourite.findByIdAndDelete(req.params.id);

    if (!deleted) {
        throw new HttpError(404, "Favourite not found.");
    }
    res.status(204).end();
}




