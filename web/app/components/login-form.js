"use client";

import { useState } from "react";
import styles from "./login-form.module.css";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <form className={styles.form}>
        <label htmlFor="Username" onSubmit={handleSubmit}>
            Username:
        </label>
        <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        
        <label htmlFor="Password" onSubmit={handleSubmit}>
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
            title="Login"
            type="submit"
        >Login</button>
        </form>
    );
}