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

    useEffect( () => {
        async function loadFavs() {
            setMessage('');

            try {
                const loadedFavourites = await getUserFavourites({search: searchBy});

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
    }, [searchBy]);
    
    
    const handleChange = (e) => {
        const n = e.target;
        setSearch(n.value);
    }
    

    const handleSearch = async (newSearch) => {
        setSearchBy(newSearch);
        console.log(newSearch);
    }

    return (
        <>
        <input
            value={search}
            onChange={handleChange}
        />
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
