import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/app/components/header";
import FavouriteButton from "@/app/components/favourite-button";
import { getArtworkById } from "@/app/lib/artworks";

// TODO: make this page display expanded details for an artpiece.
// There should be a button to favourite the piece, and send them to the edit page with the appropriate ID

export default async function ArtPage({params}) {
    const {id} = await params;
    console.log("Artwork ID", id);

    const artwork = await getArtworkById(id);
    console.log("Artwork", id);
    console.log("Artwork", artwork);
        if (!artwork) {
            return <h1>Artwork not found</h1>;
        }
    return (
        <>
        <PageHeader />
        <main>
            <h1>{artwork.title}</h1>
            <p>{artwork.shortDescription}</p>
            <p>Artist: {artwork.artist}</p>
            <p>Date: {artwork.date}</p>
            <p>Location: {artwork.creationLocation}</p>

            <FavouriteButton artwork={artwork} />

            <Link href={`/artworks/edit/${id}`}>Edit Artwork</Link>
        </main>
        </>
    );
}
      