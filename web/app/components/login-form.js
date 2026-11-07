"use client";

import { useState } from "react";
import styles from "./login-form.module.css";
import { getUsers, postUser } from "../lib/users";

export default function LoginForm() {
    const [message, setMessage] = useState(" ")
    const [createAcct, setCreating] = useState(false)

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

        if (!createAcct) {
            try {
                const {username, password} = e.target;
                if (!username.value) {
                    throw new Error("Username must be provided.")
                }

                const result = await getUsers({username: username.value})
                
                // Username Validation
                if (!result[0]) {
                    throw new Error("Username not found.")
                }

                // TODO: Password Validation, check if password matches database
                // Passwords currently non-existent in the data.
            } catch (error) {
                setMessage(error.message)
            }
        } else {
            console.log("Creating Account")
        }
        
        
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <h3>{createAcct ? "Logging in" : "Creating Account"}</h3>
        
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

        {
            createAcct ? null :
            <><label htmlFor="email">
                Email:
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            ></input></>
        }
        <button
            type="submit"
        >{createAcct ? "Login" : "Create"}</button>
        <p>{message}</p>

        <p>No account? Switch to creation here:</p>
        <button
            type="button"
            onClick={() => setCreating(!createAcct)}
        >{createAcct ? "Create account" : "Return to login"}</button>
        </form>
    );
}