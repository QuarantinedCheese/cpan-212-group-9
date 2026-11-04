"use client";

import { useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        
    }

    return (
        <form>
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
        
        <input
            type="password"
            id="Password"
            name="Password"
        />
        <button
            title="Login"
        >Login</button>
        </form>
    );
    
}