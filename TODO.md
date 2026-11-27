# TODO list

When choosing to work on an item, please add your name next to it so that the others know you are working on it.\
When an item is completed, remove it from the list, or add it to the completed section.\
If there is something you know needs to be done, and it is not on the list, please add it with as many details as you can.

Eg:
* Example item. - Ethan
  * Blah blah blah.

## General
Non-milestone specific items, anything that isn't really required, but should be done

* Proper CSS styling
  * Home Page
  * Browse Page
  * Art Detail Page
  * Login Page
  * Notes Editing Page
* 

## M5
Initialised based on the M5 checklist [in the docs](https://docs.dorzairi.com/docs/3dbba291-e3c7-4289-a0a6-a3d2d19fb881/).

* Users and passwords.
 * A User model with a unique email and a password hashed with bcryptjs.
 * Passwords are at least 8 characters and at most 72 bytes. The password hash is never included in any response.
* Auth endpoints.
 * `POST /api/auth/register`
 * `POST /api/auth/login`
 * `POST /api/auth/logout`
 * GET `/api/auth/me`, which returns the signed-in user or a 401.
 * A wrong email and a wrong password get the same 401 message.
* Sessions.
 * express-session with connect-mongo.
 * The cookie is `httpOnly`, `sameSite: 'lax'`, and `secure` in production.
 * The session is regenerated on register and login.
 * The server refuses to start if SESSION_SECRET is missing.
 * If your group uses JWT instead: tokens are signed with `jose`, have an expiry, are stored in an `httpOnly` cookie (never `localStorage`), and the server refuses to start if `JWT_SECRET` is missing.
* Protected API routes.
 * Every route that creates, updates or deletes data needs a signed-in user and returns 401 without one.
* Ownership or roles
 * Each item records the user who created it.
 * Only that user (or an admin, if your app has an admin role) can update or delete it; anyone else gets a 403.
* Frontend auth.
 * Register and login pages that show the API's error messages, a logout button, and a header that shows whether you're signed in.
 * Pages that need a signed-in user (at least create and edit) send you to the login page when you're signed out.
 * Edit and delete buttons only appear on items you're allowed to change.
* `helmet()` is applied to the Express app.
* Rate limiting.
 * express-rate-limit (using limit, not max) on the register and login routes, returning 429 when the limit is hit.
* No secrets in the repo.
 * No passwords, connection strings, API keys or session secrets anywhere in the repo or its commit history.
 * Both .env.example files list every variable with fake values.
 * If a real secret was ever committed, you changed it (new Atlas password, new key) and the README says so in one line.
* curl tests, README.
 * The Testing section in api/README.md adds the auth requests, one that gets a 401 and one that gets a 403.
 * They use a cookie jar (-c jar.txt -b jar.txt) and run top to bottom after npm run seed.
 * n Windows, run these in Git Bash. The README lists the new environment variables.
* CONTRIBUTIONS.md has an M5 section.
