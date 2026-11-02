import styles from "./page.module.css";
import Link from "next/link"


export const metadata = {
  title: {
    default: 'Art Browser',
    template: '%s | Art Browser',
  },
  description: 'Browse Art',
}

// Wraps every page, header stays on screen and Link swaps pages below.
export default function RootLayout({ children }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Art Browser</h1>
        <nav className={styles.nav}>
          <Link href="/"><h2>Home</h2></Link>
          <Link href="/artworks"><h2>Browse</h2></Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
