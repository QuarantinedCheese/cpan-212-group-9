import PageHeader from "@/app/components/header";

export const metadata={
    title: 'Login'
};

// TODO: Allow the user to login using this page.
// Once logged in, route to home page.
// Replace the 'login' link in header with the username.
// Omit Password for simplicity

// TODO: allow the user to create a new account through here as well
// Or another page

// Routed by /artworks
export default function LoginPage() {
    return(
        <>
        <PageHeader></PageHeader>
        <h1>Login Page</h1>
        </>
    )
}