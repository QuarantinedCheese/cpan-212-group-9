// TODO: control favourites (?)

import { HttpError } from "../utils/http-error.js";
import { Favourite } from "../models/Favourite.js";


export async function createFavouriteController (req, res) {
    const favourite = await Favourite.create(req.body);

    res.location(`/api/favourites/${favourite.id}`)
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




