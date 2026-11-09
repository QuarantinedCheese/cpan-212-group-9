"use client";

import { useEffect, useState } from "react";
import styles from "./favourite-button.module.css";
import Link from "next/link";

const USER_ID = "3569a16d-e3a7-43b0-9282-8cd99ab82683";

export default function FavouriteButton({ artwork }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [favourite, setFavourite] = useState(null);

    useEffect(() => {
        async function checkFavourite() {
            try {
                const res = await fetch("/api/favourites");

                if (!res.ok) {
                    throw new Error("Could not load favourites.");
                }
            const result = await res.json();

            const savedFavourite = result.data.find(
                (item) =>
                    item.id === artwork.id && item.userId === USER_ID
            );

            setFavourite(savedFavourite || null);

            } catch (error) {
                setMessage(error.message);

            } finally {
                setLoading(false);
            }
        }

        checkFavourite();
    }, [artwork.id]);
    
    async function handleFavourite() {
        setLoading(true);
        setMessage("");

        try {
          if (favourite) {
            const response = await fetch(`/api/favourites/${favourite.favouritesId}`, {
                method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Could not remove favourite.");
            }

            setFavourite(null);
            setMessage("Removed from Favourites!");
        } else {

            const res = await fetch("/api/favourites", {
                method: "POST",
                headers: { "Content-Type": "application/json",},

                body: JSON.stringify({
                    id: artwork.id,
                    title: artwork.title,
                    artist: artwork.artist,
                    userId: USER_ID,
                    notes: "",

                }),
            
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error("Could not add to Favourites.");
            }

            setFavourite(result.data);
            setMessage("Added to favourites!");
        }
    } catch (error) {
        setMessage(error.message);
    } finally {
        setLoading(false);
    }
}
return (
    <div className={styles.container}>
        <button
        className={styles.button}
        onClick={handleFavourite}
        disabled={loading}
        >

        {loading ? "Loading..." : favourite ? "Remove from Favourites" : "Add to Favourites"}

        </button>
        <p className={styles.message}>{message}</p>

        {favourite ? <Link href={`/artworks/edit/${artwork.id}`}>Edit Notes</Link> : null}
    </div>
)
};