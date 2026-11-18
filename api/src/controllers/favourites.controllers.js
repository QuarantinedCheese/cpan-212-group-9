// TODO: control favourites (?)

import { createFavourite, findFavourites, findFavouriteById, updateFavourites, deleteFavourite } from "../data/favourites.js";
import { HttpError } from "../utils/http-error.js";
import { Favourite } from "../models/Favourite.js";
import { User } from "../models/User.js";

export function createFavouriteController (req, res) {
    const favourite = createFavourite(req.body);

    res.location(`/api/favourites/${favourite.favouritesId}`)
    .status(201)
    .json({ data : favourite});
}

export async function findFavouritesController (req, res) {
    const favourites = await Favourite.find()
        .populate('userId');

    res.json({ data: favourites });
}

export async function getFavouriteById(req, res) {
    const favourite = await Favourite.findById(req.params.id)
    .populate('userId');

    if (!favourite) {
        throw new HttpError(404, 'Favourite not found.');
    }

    res.json({ data: favourite });
}

export function updateFavouriteController (req, res) {
    const favourite = updateFavourites(req.params.id, req.body);

    if (!favourite) {
        throw new HttpError(404, "Favourite not found.");
    }
    res.json({ data: favourite});
}

export function deleteFavouriteController(req, res) {
    const deleted = deleteFavourite(req.params.id);

    if (!deleted) {
        throw new HttpError(404, "Favourite not found.");
    }
    res.status(204).end();
}




