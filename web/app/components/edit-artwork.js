"use client";

import { useState } from "react";
import styles from "./edit-artwork.module.css";

export default function ArtworkEdit({artwork}) {
    const {notes, setNotes} = useState(artwork.notes)
    console.log(artwork)

    return (
        <>
        <textarea
            value={notes}
            onChange={setNotes}
        ></textarea>
        <button>Save</button>
        </>
    )
}