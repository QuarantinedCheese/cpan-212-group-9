let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Replace with proper USER_ID when authetication is implemented
async function getFallback() {
    const res = await fetch(API_ORIGIN + "/api/test");

    if (!res.ok) {
        throw new Error('Could not find fallback user. Is the database seeded correctly?');
    }

    const body = await res.json();
    return body.data
}
    

// PATCH a favourite item
export async function patchFavouriteNotes({params}) {
    const res = await fetch(API_ORIGIN + "/api/favourites/" + params.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({
            notes: params.notes,
        })
    });

    if (!res.ok) {
        throw new Error(`Could not patch favourite. ${res.status} was returned when attempting to update with values: ${params.id}, ${params.notes}`)
    }

    const body = await res.json();
    return body.data;
}

export async function VerifyFavourite(artwork) {
    const user = await getFallback();
    const res = await fetch(API_ORIGIN + "/api/favourites");

    if (!res.ok) {
        throw new Error("Could not load favourites.");
    }
    const result = await res.json();

    const savedFavourite = result.data.find(
        (item) =>
            item.instituteID === artwork.id && item.userId?.id === user._id
    );

    return savedFavourite;
}

// Returns all of a user's favourites
export async function getUserFavourites(params = {}) {
    const user = await getFallback();
    
    const base = `/api/favourites?userId=${user._id}`;
    const search = params.search ? `&search=${params.search}` : '';
    const sort = params.sort ? `&sort=${params.sort}` : '';

    const res = await fetch(API_ORIGIN + base + search + sort);

    if (!res.ok) {
        throw new Error("Could not load favourites.");
    }
    const result = await res.json();

    return result.data;
}