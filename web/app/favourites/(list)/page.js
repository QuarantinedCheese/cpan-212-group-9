import PageHeader from "@/app/components/header";
import Link from "next/link";
import { Suspense } from "react";
import { getUserFavourites } from "@/app/lib/favourites";
import Image from "next/image";


export const metadata={
    title: 'Browse'
};

// TODO: Have this page display a list of artworks
// Should also make it able to display only favourites if toggled.

async function ArtworksList() {
    let favourites;

    try {
        favourites = await getUserFavourites();
    } catch (error) {
        
        return <p> Failed to load artworks. Please try again later.</p>;
    }

    if (favourites.length === 0) {
        return <p>No artworks found.</p>;
    }

    const formatDate = (date) => {
        date = new Date(date);
        const dateStr = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const timeStr = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
            timeZoneName: "short",
            timeZone: "America/New_York"
        })
        return `${dateStr}, ${timeStr}`
    };

    return (
        <ul>
            {favourites.map((artwork) => (
                <li key={artwork.id}>
                    {/* <img
                        src={artwork.imageUrl}
                        alt={artwork.imageUrl}
                        referrerPolicy="no-referrer"
                    /> */}
                    <h2>
                    <Link href={`/artworks/${artwork.instituteID}`}>
                        {artwork.title}
                    </Link>
                    </h2>
                    <p>Artist: {artwork.artist}</p>
                    <p>Faved: {formatDate(artwork.createdAt)}</p>
                    
                   
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
