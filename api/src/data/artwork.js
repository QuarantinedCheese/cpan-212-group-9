import { HttpError } from '../utils/http-error.js';

const artworks = [
    {
        id: '24645',
        title: 'The Great Wave off Kanagawa',
        altTitles: [],
        date: '1831',
        artist: 'Hokusai',
        creationLocation: 'Japan',
        shortDescription: 'Woodblock print showing massive waves framing Mount Fuji.',
        imageUrl: 'https://www.artic.edu/iiif/2/b3974542-b9b4-7568-fc4b-966738f61d78/full/843,/0/default.jpg'
    },
    {
        id: '129884',
        title: 'Starry Night and the Astronauts',
        altTitles: [],
        date: '1972',
        artist: 'Alma Thomas\nAmerican, 1891–1978',
        creationLocation: 'United States',
        shortDescription: 'Abstract painting composed of small vertical dabs of multiple shades of blue with a small area of similar strokes of red, orange, and yellow in the upper right.',
        imageUrl: 'https://www.artic.edu/iiif/2/e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9/full/843,/0/default.jpg'
    },
    {
        id: '17229',
        title: 'The Scream',
        altTitles: ['Der Schrei der Natur'],
        date: '1893',
        artist: 'Edvard Munch',
        creationLocation: 'Norway',
        shortDescription: 'Iconic expressionist painting depicting a figure with an agonized expression against a fiery sky.',
        imageUrl: 'https://www.artic.edu/iiif/2/3b374643-5328-3e00-c02b-5ab56e5ae8f8/full/843,/0/default.jpg'
    }
];

export function findArtworks({ artist, q } = {}) {
    let results = artworks;
    if (artist) {
        results = results.filter((art) => art.artist.toLowerCase() === artist.toLowerCase());
    }
    if (q) {
        const search = q.toLowerCase();
        results = results.filter((art) => 
            art.title.toLowerCase().includes(search) || 
            art.artist.toLowerCase().includes(search)
        );
    }
    return results;
}

export function findArtworkById(id) {
    return artworks.find((art) => art.id === id);
}

// Inmemory cache 5min expiry 
const internalMemory = new Map();
const CACHE = 5 * 60 * 1000;

function getCached(key) {
    if (!internalMemory.has(key)) return null;
    const cached = internalMemory.get(key);
    if (Date.now() > cached.expiry) {
        internalMemory.delete(key);
        return null;
    }
    console.log('cache hit');
    return cached.data;
}

function setCache(key, data) {
    internalMemory.set(key, {
        data,
        expiry: Date.now() + CACHE
    });
}

const API_BASE = 'https://api.artic.edu/api/v1';
const FALLBACK_IIIF_URL = 'https://www.artic.edu/iiif/2';

//needed to not be blocked by API
const HEADERS = {
    'User-Agent': 'ArtGalleryClassProject/1.0',
    'AIC-User-Agent': 'ArtGalleryClassProject/1.0',
    'Accept': 'application/json'
};

const FIELDS = [
    'id',
    'title',
    'alt_titles',
    'date_display',
    'artist_display',
    'place_of_origin',
    'thumbnail',
    'image_id'
].join(',');

function toArtwork(item, iiifUrl = FALLBACK_IIIF_URL) {
    return {
        id: String(item.id),
        title: item.title,
        altTitles: item.alt_titles || [],
        date: item.date_display,
        artist: item.artist_display,
        creationLocation: item.place_of_origin,
        shortDescription: item.thumbnail?.alt_text || '',
        imageUrl: item.image_id
            ? `${iiifUrl}/${item.image_id}/full/843,/0/default.jpg`
            : null
    };
}

export async function fetchExternalSearch(query) {
    const key = `search_${query.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;
    try {
        const res = await fetch(
            `${API_BASE}/artworks/search?q=${encodeURIComponent(query)}&fields=${FIELDS}&limit=10`,
            { headers: HEADERS, signal: AbortSignal.timeout(5000) }
        );
        if (!res.ok) {
            const body = await res.text();
            console.error('AIC search error', res.status, body.slice(0, 300));
            throw new HttpError(502, 'Bad Gateway');
        }
        const json = await res.json();
        const iiifUrl = json.config?.iiif_url || FALLBACK_IIIF_URL;
        const results = json.data.map((item) => toArtwork(item, iiifUrl));
        setCache(key, results);
        return results;
    } catch (err) {
        if (err.name === 'AbortError' || err.name === 'TimeoutError') {
            throw new HttpError(504, 'Gateway Timeout');
        }
        if (err instanceof HttpError) throw err;
        console.error('fetchExternalSearch failed:', err);
        throw new HttpError(502, 'Bad Gateway');
    }
}

export async function fetchExternalById(id) {
    const key = `id_${id}`;
    const cached = getCached(key);
    if (cached) return cached;
    try {
        const res = await fetch(
            `${API_BASE}/artworks/${encodeURIComponent(id)}?fields=${FIELDS}`,
            { headers: HEADERS, signal: AbortSignal.timeout(5000) }
        );
        if (!res.ok) {
            const body = await res.text();
            console.error('AIC by-id error', res.status, body.slice(0, 300));
            throw new HttpError(502, 'Bad Gateway');
        }
        const json = await res.json();
        const iiifUrl = json.config?.iiif_url || FALLBACK_IIIF_URL;
        const artwork = toArtwork(json.data, iiifUrl);

        setCache(key, artwork);
        return artwork;
    } catch (err) {
        if (err.name === 'AbortError' || err.name === 'TimeoutError') {
            throw new HttpError(504, 'Gateway Timeout');
        }
        if (err instanceof HttpError) throw err;
        console.error('fetchExternalById failed:', err);
        throw new HttpError(502, 'Bad Gateway');
    }
}

export function addToInternalMemory(key, value) {
    setCache(key, value);
}

export function updateInternalMemory(key, value) {
    if (internalMemory.has(key)) {
        setCache(key, value);
    }
}

export function deleteFromInternalMemory(key) {
    internalMemory.delete(key);
}