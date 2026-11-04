let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Load multiple users, with the option of searching
export async function getUsers({search}) {

    const res = await fetch(API_ORIGIN + '/api/users' + `?q=${search}`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when loading artworks.');
    }

    const body = await res.json();
    return body.data;
} // end get artworks

// Load one user
export async function getUserById(id) {
    const res = await fetch (API_ORIGIN + '/api/users/' + id, { cache: 'no-store' });

    if (res.status === 404) {
        return null;
    }
    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when loading user' + id);
    }
    
    const body = await res.json();
    return body.data;
}