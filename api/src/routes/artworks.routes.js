// TODO: Routing for artworks
import { Router } from 'express';
import { listArtworks, getArtwork, searchArtworks } from '../controllers/artworks.controllers.js';

export const artworkRouter = Router();

artworkRouter.get('/', listArtworks);
artworkRouter.get('/search', searchArtworks);
artworkRouter.get('/:id', getArtwork);