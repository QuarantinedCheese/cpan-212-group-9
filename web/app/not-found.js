import Link from 'next/link';

// Shown for any URL that doesn't match a page, and whenever a page calls notFound().
export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>That page or artwork does not exist. The URL may be incorrect or the artwork you were trying to visit was removed.</p>
    </section>
  );
}