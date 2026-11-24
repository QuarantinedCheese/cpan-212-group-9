import styles from './header.module.css';
import Link from "next/link"

// WHEN AUTHENTICATION: LOGIN TURNS INTO FAVOURITES

export default function PageHeader() {
    return (
        <header className={styles.header}>
            <h1>Art Browser</h1>
            <nav className={styles.nav}>
                <Link href="/"><h2> Home </h2></Link>
                <Link href="/artworks"><h2> Browse </h2></Link>
                <Link href="/login"><h2> Login </h2></Link>
                <Link href="/favourites"><h2> Favourites </h2></Link>
            </nav>
        </header>
    );
}