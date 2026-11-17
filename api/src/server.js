// Starts the app
import { app } from './app.js';
import { connectDb } from './db.js';

const port = process.env.PORT ?? 4000;

// Connect mongo first
await connectDb();

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`API running at http://localhost:${port}`);
});