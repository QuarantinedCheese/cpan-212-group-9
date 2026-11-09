"use client";

import { useState } from "react";
import styles from "./edit-artwork.module.css";

export default function ArtworkEdit({artwork, handleSave}) {
    const [notes, setNotes] = useState(artwork.notes);
    const maxChars = 2000;
    const [charsLeft, setCharsLeft] = useState(maxChars);
    const [saved, setSaved] = useState(true);

    const handleChange = (e) => {
        const n = e.target;
        setNotes(n.value);
        setSaved(false);

        // Adjust chars left
        setCharsLeft(maxChars - [...n.value].length);
    }

    return (
        <>
        <textarea
            value={notes}
            onChange={handleChange}
        ></textarea>
        <button
            onClick={() => {
                handleSave(notes);
                setSaved(true)
            }}
        >Save</button>
        <p>{charsLeft}</p>
        <p>{saved ? "Saved!" : "Changes not Saved!"}</p>
        </>
    )
}