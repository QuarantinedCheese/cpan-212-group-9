// Get the API
let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Loads a set of artworks from the API
export async function getArtworks() {
    // cache
    const res = await fetch(API_ORIGIN + '/api/artwork', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when loading artworks.');
    }

    const body = await res.json();
    return body.data;
} // end get artworks


// Loads one artwork
export async function getArtworkByID(id) {
    const res = await fetch(API_ORIGIN + '/api/artwork/' + id, { cache: 'no-store' });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when loading event' + id);
    }

    const body = await res.json();
    return body.data;
} // end get artworks w/ ID