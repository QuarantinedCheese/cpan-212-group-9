

export function validateFavourites(body, {partial = false} = {}) {
    const errors = {};
    const values = {};
    const shouldCheck = (field) => !partial || body[field] !== undefined;

    // Make sure it has a title
    if (shouldCheck('title')) {
        const title = typeof body.title === 'string' ? body.title.trim() : '';
        if (title.length <= 0) {
            errors.title = 'Title must be at least one character';
        } else {
            values.title = title;
        }
    }

    // Make sure it has an artist
    if (shouldCheck('artist')) {
        const artist = typeof body.artist === 'string' ? body.artist.trim() : '';
        if (artist.length <= 0) {
            errors.artist = 'Artist name must be at least one character';
        } else {
            values.artist = artist;
        }
    }

    // Make sure it has an id from the AIC
    if (!partial) {
        const instituteId = body.id;
        if (!instituteId) {
            errors.id = 'The artwork\'s Institute ID must exist.';
        } else {
            values.id = instituteId;
        }
    }

    // Make sure the userID exists.
    // TODO: Call self to make sure the ID actually exists in users.
    if (!partial) {
        const userId = body.userId;
        if (!userId) {
            errors.userId = 'The artwork must be connected to a user. Provide a userID.';
        } else {
            values.userId = userId;
        }
    }

    // Check to make sure notes are no more than 5000 chars.
    if (shouldCheck('notes')) {
        const notes = typeof body.notes == 'string' ? body.notes.trim() : '';
        if (notes.length > 5000) {
            errors.notes = 'Notes are limited to 5000 characters.';
        } else {
            values.notes = notes;
        }
    }



    if (partial && Object.keys(values).length === 0 && Object.keys(errors).length === 0) {
        errors.body = 'Pass at least one field to change.';
    }

    console.log(values)
    return {values, errors};
}


