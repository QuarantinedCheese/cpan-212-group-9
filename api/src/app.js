// Creates the app and registers everything

import path from 'node:path';
import express from 'express';
// Remember to import the Routers here after implementing
// them, and uncomment the appropriate code
import { requestLogger } from './middleware/request-logger.js';
import { notFound } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';
import { favouritesRouter } from './routes/favourites.routes.js';
import { artworkRouter } from './routes/artworks.routes.js';
import { usersRouter } from './routes/users.routes.js';

export const app = express();

// Express runs routes top to bottom, order matters
app.use(requestLogger);
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, '..', 'public')));

// CORS fix
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
// This is how Express knows what to do with each path
app.use('/api/users', usersRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/artwork', artworkRouter);


// Must stay last
app.use(notFound); // Catches anything no route matches
app.use(errorHandler); // Catches errors