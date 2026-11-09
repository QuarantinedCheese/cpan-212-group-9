let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

const USER_ID = "3569a16d-e3a7-43b0-9282-8cd99ab82683";

// PATCH a favourite item
// export async function getFavouriteById() {
//     const res = await fetch(API_ORIGIN)
// }

async function CheckFavourite(artwork) {
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
