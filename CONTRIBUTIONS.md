# M1. PROPOSAL AND API DESIGN

*Kristine May Garcia*
- Helped in brainstorming the project
- Helped and finished the endpoint list
- Contributed in the features and later list
- Helped in building the M1 idea

*Ethan Pothier*
* Helped brainstorm project
* Helped with feature/later list
* Started endpoint list
* prepared REPO for later work, including /api, /web, and .gitignore

*Autumn Gun-Munro*
  - Helped brainstorm project
  - Contributed with the features and later list
  - Created and added wireframe sketches


# M2. Express REST API

*Kristine May Garcia*
 - Added data for favourites
 - Added routing
 - Added validators
 - Added controllers

*Ethan Pothier*
* Prepared /api for API implementation
* Implemented and tested GET/POST/PATCH/DELETE for all user resources, including validation
* Implemented Error handling and request logger
* Assisted with favourites data.
* Initalized api/README.md to be filled out
* Added api/users/ information to README

*Autumn Gun-Munro*
  - Integrated the Art Institute of Chicago API
  - In memory caching
  - Timeout handling
  - Artwork data, controllers, router

# M3. Next.js Frontend

*Kristine May Garcia*
- Added favourites and favourite button
- Updated css
- Updated page for displayed artworks
- Updated loading.js
- Updated expanded page display
- Individual video: https://youtu.be/06PfVpiFcD8

*Ethan Pothier*
* Prepared /web for web implementation
* Added basic header for easier development
* Prepped all* pages for implementation
* Implemented not-found.js
* Helped keep repo and files organized and coherent
* Implemented the login and editing pages
* Individual Video: https://youtu.be/cGmxKRjwUdc

*Autumn Gun-Munro*
- Added image url mapping
- Added searchArtworks route controller

# M4. MongoDB Persistence

*Kristine May Garcia*
- Implemented relationships between User and Favourite models using Mongoose and populate.
- Updated CRUD according to Mongoose
- Mongoose validation errors
- Checked validation errors for forms, ids, nonexisting documents
- Implemented filtering, sorting, and pagination for the Favourite API endpoint
- Added case-insensitive title search
- Implemented pagination with page and limit, with a maximum of 50
- Tested page and limit error validation
- Initiated seed script for favourites

*Ethan Pothier*
* Added MongoDB connection
* Ensured API stops with a message when `MONGODB_URI` is missing
* Added schema validation with models
* Initiated Seed script for users, adjusted seed script for favourites