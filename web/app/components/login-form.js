"use client";

import { useState } from "react";
import styles from "./login-form.module.css";

export default function LoginForm() {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        
    }

    return (
        <form className={styles.form}>
        <label htmlFor="Username" onSubmit={handleSubmit}>
            Username:
        </label>
        <input
            type="text"
            id="Username"
            name="Username"
            value={username}
            onChange={setUsername}
        />
        
        <label htmlFor="Password" onSubmit={handleSubmit}>
            Password:
        </label>
        <input
            type="Password"
            id="Password"
            name="Password"
        />
        <button
            title="Login"
        >Login</button>
        </form>
    );
    
}