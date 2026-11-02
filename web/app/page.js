import styles from "./page.module.css";
import PageHeader from "./components/header";


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
      <PageHeader></PageHeader>
      <main>{children}</main>
    </div>
  );
}
