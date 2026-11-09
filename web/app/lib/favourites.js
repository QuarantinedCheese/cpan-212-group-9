let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Replace with proper USER_ID when authetication is implemented
const USER_ID = "3569a16d-e3a7-43b0-9282-8cd99ab82683";

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
            item.id === artwork.id && item.userId === USER_ID
    );

    return savedFavourite;
}
