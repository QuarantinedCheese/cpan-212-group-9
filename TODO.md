# TODO list

When choosing to work on an item, please add your name next to it so that the others know you are working on it.\
When an item is completed, remove it from the list.\
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

## M4
Initialised based on the M4 checklist [in the docs](https://docs.dorzairi.com/docs/3dbba291-e3c7-4289-a0a6-a3d2d19fb881/).

* Connection.
  * API runs The API runs `await mongoose.connect(process.env.MONGODB_URI)` before `app.listen`, stops with a clear message if `MONGODB_URI` is missing
  * Sets `mongoose.set('sanitizeFilter', true)`.
  * `api/.env.example` lists `MONGODB_URI` with a fake value.
* Models replace in-memory data.
  * Both main resources are Mongoose 9 models with schema validation (required fields, and lengths, ranges or enums where they fit).
  * Every M2 endpoint now reads and writes MongoDB, and no in-memory arrays are left for these resources (the external API cache can stay in memory).
  * Updates use `{ returnDocument: 'after', runValidators: true }`.
* Related models.
  * At least two models are related with a `ref`, and at least one endpoint returns the related data using `populate`.
* Validation errors.
  * Mongoose validation errors get a 400 in your error shape with field details, never a 500.
  * A badly formed id and a document that doesn't exist both get a 404.
  * The M3 forms show these field errors on the page.
* Filter, sort and paginate.
  * One list endpoint accepts query parameters for at least one filter, a sort (only fields on your allowlist; any other sort field gets a 400) and pagination (`page` and `limit`, with a maximum `limit`).
  * It returns the items together with the total count and the number of pages.
  * If you search text with a regular expression, escape the user's input first.
* List page controls.
  * The matching list page in `web/` has controls for the filter, the sort and moving between pages.
  * They update the URL query string, so reloading the page keeps the same view.
* Seed script.
  * `npm run seed` in `api/` deletes and re-creates sample data for every model, with at least 25 documents in the paginated collection.
  * No route creates or deletes seed data.
* `README` and `CONTRIBUTIONS.md`.
  * The `README` says how to set `MONGODB_URI`, how to run the seed, and which query parameters the list endpoint accepts.
  * `CONTRIBUTIONS.md` has an M4 section.
* 
