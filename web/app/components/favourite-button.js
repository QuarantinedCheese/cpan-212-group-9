"use client";

import { useEffect, useState } from "react";
import styles from "./favourite-button.module.css";
import Link from "next/link";
import { VerifyFavourite } from "../lib/favourites";

let API_ORIGIN = process.env.API_ORIGIN;
if (!API_ORIGIN) {
    API_ORIGIN = 'http://localhost:4000';
}

// Replace with proper USER_ID once authentication is implemented
let USER_ID = 'Does not matter right now'

export default function FavouriteButton({ artwork }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [favourite, setFavourite] = useState(null);

    useEffect(() => {
        async function checkFavourite() {
            try {
                const savedFavourite = await VerifyFavourite(artwork);
                console.log('Saved: ' + savedFavourite)
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
            // console.log("Artwork ID: ", artwork.id);
            // console.log("Artwork:", artwork);
            if (favourite) {
            
                const response = await fetch(`${API_ORIGIN}/api/favourites/${favourite.id}`, {
                    method: "DELETE" }
                );

                if (!response.ok) {
                    throw new Error("Could not remove favourite.");
                }

                setFavourite(null);
                setMessage("Removed from Favourites!");
            } else {
                const res = await fetch(API_ORIGIN + "/api/favourites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json",},

                    body: JSON.stringify({
                        instituteID: artwork.id,
                        title: artwork.title,
                        artist: artwork.artist,
                        userId: USER_ID,
                        notes: "",

                    }),
                
                });

                const result = await res.json();

                if (!res.ok) {
                    const details = result.error?.details;

                    if (details) {
                        throw new Error(Object.values(details).join(" "));
                    }
                    throw new Error(
                        result.error?.message || "Could not add to Favourites.");
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
    );
};