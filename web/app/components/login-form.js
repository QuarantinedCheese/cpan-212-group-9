"use client";

import { useState } from "react";
import styles from "./login-form.module.css";
import { getUsers } from "../lib/users";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const {username, password} = e.target;

        const result = await getUsers({username: username.value})

        console.log(result)
        
        // Username Validation

        // TODO: Password Validation
        // Passwords currently non-existent in the data.
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">
            Username:
        </label>
        <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        
        <label htmlFor="password">
            Password:
        </label>
        <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />
        <button
            type="submit"
        >Login</button>
        </form>
    );
}