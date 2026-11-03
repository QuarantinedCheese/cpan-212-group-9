import PageHeader from "@/app/components/header";
import Link from "next/link";


export const metadata={
    title: 'Browse'
};

// TODO: Have this page display a list of artworks
// Should also make it able to display only favourites if toggled.

async function getArtworks() {
        const res = await fetch(`${process.env.API_URL}/api/artwork`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Failed to fetch artworks');
        }

        const result = await res.json();
        return result.data;
    } 
   
// Routed by /artworks
export default async function artworksList() {

    let artworks;

    try {
        artworks = await getArtworks();
    } catch {
      return(
        <>
            <PageHeader></PageHeader>
            <main>
            <h1>Art Browsing</h1>
            <p>Failed to load artworks. Please try again later.</p>
            </main>
            </>
        );
    }

    return (
        <>
        <PageHeader></PageHeader>
        <main>
            <h1>Art Browsing</h1>

            {artworks.length === 0 ? (
                <p>No artworks found.</p>
            ) : (
                <ul>
                    {artworks.map((artwork) => (
                        <li key={artwork.id}>
                            <h2>
                            <Link href={`/artworks/${artwork.id}`}>
                                {artwork.title}
                            </Link>
                            </h2>

                            <p>Artist: {artwork.artist}</p>
                            <p>Date: {artwork.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
        </>
    );
}