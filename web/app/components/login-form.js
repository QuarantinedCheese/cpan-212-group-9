"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login-form.module.css";
import { getUsers, postUser } from "../lib/users";


// TODO: IN M5, WE WILL NEED AUTHENTICATION HERE
// LOGINS VIA THIS PAGE WILL NOT YET BE AUTHENTICATED OR PERSISTENT

export default function LoginForm() {
    const router = useRouter();

    const [message, setMessage] = useState(" ");
    const [createAcct, setCreating] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        
        // LOGGING IN
        if (!createAcct) {
            try {
                const {username, password} = e.target;
                if (!username.value) {
                    throw new Error("Username must be provided.");}
                if (!password.value) {
                    throw new Error("Username must be provided.");}

                const result = await getUsers({username: username.value});
                
                // Username Validation
                if (!result[0]) {
                    throw new Error("Username not found.");
                }

                // TODO: Password Validation, check if password matches database
                // Passwords currently non-existent in the data.
                
                // If nothing failed, route to home
                router.push("/")
            } catch (error) {
                setMessage(error.message);
            }

        // ACCOUNT CREATION
        } else {
            try {
                const {username, password, email} = e.target;
                if (!username.value) {
                    throw new Error("Username must be provided.");}
                if (!password.value) {
                    throw new Error("Password must be provided.");}
                if (!email.value) {
                    throw new Error("Email must be provided.");}

                // Validate the email
                const re = /^\S+@\S+\.\S+$/;
                if (!email.value.toLowerCase().match(re)) { // Tests email against the regex
                    throw new Error("Email format invalid.")
                }

                // TODO: Password validation, make sure it has special chars, long enough, etc

                const result = await postUser({params: {username: username.value, email: email.value}});

                
                // If nothing failed, route to home
                router.push("/")
            } catch (error) {
                setMessage(error.message);
            }
        }
    }



    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <h3>{!createAcct ? "Logging in" : "Creating Account"}</h3>
        
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
            !createAcct ? null :
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
        >{!createAcct ? "Login" : "Create"}</button>
        <p>{message}</p>

        <p>No account? Switch to creation here:</p>
        <button
            type="button"
            onClick={() => setCreating(!createAcct)}
        >{!createAcct ? "Create account" : "Return to login"}</button>
        </form>
    );
}