// TODO: Routing for the users
import { Router } from 'express';
import { getSingleUser } from '../controllers/users.controllers.js';

// Paths are relative to where the router is mounted in app.js
// For this, that is /api/test
export const testRouter = Router();

testRouter.get('/', getSingleUser);