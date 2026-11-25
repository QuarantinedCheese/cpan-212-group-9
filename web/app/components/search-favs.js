"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getUserFavourites } from "@/app/lib/favourites";
import Image from "next/image";


function ArtworksList({favourites}) {
    
    const formatDate = (date) => {
        date = new Date(date);
        const dateStr = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const timeStr = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
            timeZoneName: "short",
            timeZone: "America/New_York"
        })
        return `${dateStr}, ${timeStr}`
    };

    return (
        <ul>
            {favourites.map((artwork) => (
                <li key={artwork.id}>
                    {/* <img
                        src={artwork.imageUrl}
                        alt={artwork.imageUrl}
                        referrerPolicy="no-referrer"
                    /> */}
                    <h2>
                    <Link href={`/artworks/${artwork.instituteID}`}>
                        {artwork.title}
                    </Link>
                    </h2>
                    <p>Artist: {artwork.artist}</p>
                    <p>Faved: {formatDate(artwork.createdAt)}</p>
                </li>
            ))}

        </ul>
    );
}

// Routed by /artworks
export default function FavouritesSearch() {
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState(search);
    const [favourites, setFavourites] = useState(null);
    const [message, setMessage] = useState('');
    
    const defaultSort = {
        title: false,
        artist: false,
        createdAt: false,
    };
    const [sort, setSort] = useState(defaultSort)

    useEffect( () => {
        async function loadFavs() {
            setMessage('');

            // Define sorted
            let sorted;
            if (sort.artist) {
                sorted = 'artist';
            } else if (sort.title) {
                sorted = 'title';
            } else if (sort.createdAt) {
                sorted = 'createdAt';
            }

            try {
                // Load favourites
                const loadedFavourites = await getUserFavourites({search: searchBy, sort: sorted});

                if (loadedFavourites.length > 0) {
                    setFavourites(loadedFavourites);
                } else {
                    setFavourites(null);
                }
            } catch (error) {
                setMessage("Failed to load artworks, try again later.");
            }
        };

        loadFavs();
    }, [searchBy, sort.artist, sort.title, sort.createdAt]);
    
    
    const handleChange = (e) => {
        const n = e.target;
        setSearch(n.value);
    }
    const handleSearch = async (newSearch) => {
        setSearchBy(newSearch);
    }


    const handleSortChange = (e, key) => {
        const value = e.target.checked;
        if (key == 'title') {
            setSort({...defaultSort, title: value});
        } else if (key == 'artist') {
            setSort({...defaultSort, artist: value});
        } else if (key == 'createdAt') {
            setSort({...defaultSort, createdAt: value});
        }
    }

    return (
        <>
        <input
            value={search}
            onChange={handleChange}
        />

        <p>Sorting Options:</p>
        <label htmlFor="title">
            <input
                id="title"
                type='checkbox'
                checked={sort.title}
                onChange={(e) => handleSortChange(e, 'title')}
            /> Title </label>
        <label htmlFor="artist">
            <input
                id="artist"
                type='checkbox'
                checked={sort.artist}
                onChange={(e) => handleSortChange(e, 'artist')}
            /> Artist </label>
        <label htmlFor="createdAt">
            <input
                id="createdAt"
                type='checkbox'
                checked={sort.createdAt}
                onChange={(e) => handleSortChange(e, 'createdAt')}
            /> Fave date </label>
        
        <button
            onClick={() => {
                handleSearch(search);
            }}
        >Search</button>

        <Suspense fallback={<p>Loading artworks...</p>}>
            {favourites ? <ArtworksList favourites={favourites}/> : <p>No favourites available.</p>}
        </Suspense>
        </>
    );
}
