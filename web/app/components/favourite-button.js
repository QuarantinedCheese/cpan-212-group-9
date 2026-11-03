"use client";

import { useState } from "react";

export default function FavouriteButton({ artwork }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleFavourite() {
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/favourites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: artwork.id,
                    title: artwork.title,
                    artist: artwork.artist,
                    userId: "3569a16d-e3a7-43b0-9282-8cd99ab82683",
                    notes: "",
                
                }),

            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Could not add to favourites.");
            }

            setMessage("Added to favourites!");
        } catch (error) {
            setMessage(error.message);

        } finally {
            setLoading(false);
        
        }
    }

    return (
        <div>
            <button onClick={handleFavourite} disabled={loading}>
                {loading ? "Adding..." : "Add to Favourites"}
            </button>

        <p>{message}</p>
        </div>
    );
}