let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Replace with proper USER_ID when authetication is implemented
const USER_ID = "6afe2b0592ae78000465c2d6";

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
    const res = await fetch(API_ORIGIN + "/api/favourites");

    if (!res.ok) {
        throw new Error("Could not load favourites.");
    }
    const result = await res.json();

    const savedFavourite = result.data.find(
        (item) =>
            item.instituteID === artwork.id && item.userId?.id === USER_ID
    );

    return savedFavourite;
}
