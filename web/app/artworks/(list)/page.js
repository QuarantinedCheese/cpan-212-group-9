import PageHeader from "@/app/components/header";
import Link from "next/link";
import { Suspense } from "react";
import { getArtworks } from "@/app/lib/artworks";


export const metadata={
    title: 'Browse'
};

// TODO: Have this page display a list of artworks
// Should also make it able to display only favourites if toggled.

async function ArtworksList() {
    let artworks;

    try {
        artworks = await getArtworks();
    } catch {
        return <p> Failed to load artworks. Please try again later.</p>;
    }

    if (artworks.length === 0) {
        return <p>No artworks found.</p>;
    }

    return (
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
    );
}

// Routed by /artworks
export default async function ArtworksListPage() {
    return (
        <>
        <PageHeader></PageHeader>
  
            <main>
            <h1>Art Browsing</h1>
            <Suspense fallback={<p>Loading artworks...</p>}>
                <ArtworksList />
            </Suspense>
            </main>
            </>
        );
    }
