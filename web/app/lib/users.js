let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Load one user
export async function getUserById(id) {
    const res = await fetch (API_ORIGIN + '/api/users', { cache: 'no-store' });

    if (res.status === 404) {
        return null;
    }
    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when loading user' + id);
    }
    
    const body = await res.json();
    return body.data;
}