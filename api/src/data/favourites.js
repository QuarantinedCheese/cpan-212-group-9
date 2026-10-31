// TODO: should store data about favourites

import { randomUUID } from 'node:crypto';
//data from: https://raw.githubusercontent.com/art-institute-of-chicago/api-data/refs/heads/main/getting-started/allArtworks.jsonl
const favourites = [
    { 
        favouritesId: '85f380f1-ae41-4a06-9158-1747629bca6a',
        userId: '3569a16d-e3a7-43b0-9282-8cd99ab82683',
        id: '27992',
        title: 'A Sunday on La Grande Jatte',
        artist: 'Georges Seurat',
        notes: 'abc'
    },
    {
        favouritesId: '083c140e-d473-4a21-aefa-68186715fdac',
        userId: '3569a16d-e3a7-43b0-9282-8cd99ab82683',
        id: '28401',
        title: 'The Cowherd',
        artist: 'Claude Lorrain',
        notes: 'The fitness gram pacer test is a multi-arobic capacity test-'
    },
    {
        favouritesId: 'e41dc261-723a-416b-96e8-dacd351f4685',
        userId: '3569a16d-e3a7-43b0-9282-8cd99ab82683',
        id: '28412',
        title: 'The Apse of Notre-Dame, Paris',
        artist: 'Ferdinand Jules Albert Gosselin',
        notes: 'notr dam'
    },
    {
        favouritesId: '1b025d74-0f4a-4081-8bf3-0b1b12073646',
        userId: '1e9c22d0-c0a9-40d1-8a5a-c6d7fb6665db',
        id: '27947',
        title: 'The Queen of Sheba Walking on the Waters',
        artist: 'Georges Reverdy',
        notes: ''
    },
    {
        favouritesId: '2890c6e2-2be9-4141-bd91-cf162414f71d',
        userId: '1e9c22d0-c0a9-40d1-8a5a-c6d7fb6665db',
        id: '28199',
        title: 'Portrait of Titian',
        artist: 'Agostino Carracci',
        notes: ''
    },
    {
        favouritesId: 'ef250383-2a2e-46e9-bebf-c356ad62af43',
        userId: '1e9c22d0-c0a9-40d1-8a5a-c6d7fb6665db',
        id: '28207',
        title: 'Landscape',
        artist: 'Oguri Sotan',
        notes: ''
    },
    {
        favouritesId: '223e3a4a-3644-4758-a185-300e4ffcfa65',
        userId: '67c7ccd6-2f95-4a34-a059-98c309bcfe82',
        id: '28442',
        title: 'Composition',
        artist: 'Serge Poliakoff',
        notes: ''
    }
] // temp data, may be more or less detailed in the future

//following functions follow CRUD
//Create
export function createFavourite(artwork) {
    const newFavourite = {favouritesId: randomUUID(), ...artwork};

    favourites.push(newFavourite);
    return newFavourite;
}
//Read
export function findFavourites({ q } = {}){
    let results = favourites
    if (q) {
        const search = q.toLowerCase();
        results = results.filter((favourite) => 
            favourite.title.toLowerCase().includes(search) ||
            favourite.artist.toLowerCase().includes(search)
        )
    }
    return results;
    // May need to be expanded to include genre filtering in the future
}

export function findFavouriteById(favouritesId) {
    return favourites.find(
        favourite => favourite.favouritesId === favouritesId
    );
}
//Update
export function updateFavourites(favouritesId, updates) {
    const favourite = findFavouriteById(favouritesId);

    if(favourite) {
        Object.assign(favourite, updates);
    }

    return favourite;

}

//Delete
export function deleteFavourite(favouritesId) {
    const index = favourites.findIndex(
        favourite => favourite.favouritesId === favouritesId
    );

    if (index === -1) {return false;}

    favourites.splice(index, 1);
    return true;
}


