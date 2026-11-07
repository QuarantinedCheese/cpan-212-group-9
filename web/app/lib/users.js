let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Load multiple users, with the option of searching
export async function getUsers({username, search}) {
    // Check if username is being used
    let params = '';
    if (username != undefined) {
        params += `?username=${username}`;
    }

    // Check if search is being used
    if (search != undefined && params == '') {
        params += `?search=${search}`;
    } else if (search != undefined) {
        params += `&search=${search}`;
    }

    const res = await fetch(API_ORIGIN + '/api/users' + params, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when loading artworks.');
    }

    const body = await res.json();
    return body.data;
} // end get users

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


// Create one user
export async function postUser({params}) {
    console.log(params)
    const res = await fetch (API_ORIGIN + '/api/users/',{
        cache: 'no-store',
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({
            username: params.username,
            email: params.email,
        })
    });

    if (res.status === 400) {
        return null;
    }

    if (!res.ok) {
        throw new Error('The API answered ' + res.status + ' when attempting to create user with params: ' + {...params});
    }

    const body = await res.json();
    return body.data;
}