import PageHeader from "@/app/components/header";
import ArtworkEdit from "@/app/components/edit-artwork";
import { notFound } from "next/navigation";
import { getArtworkById } from "@/app/lib/artworks";
import { VerifyFavourite, patchFavouriteNotes } from "@/app/lib/favourites";

export const instant = false;


export default async function editPage({params}) {
    const {id} = await params;
    // Get artwork here:
    const artwork = await getArtworkById(id);
    if (!artwork){
        notFound();
    }
    // Find the fav'd version of the piece
    const faved = await VerifyFavourite(artwork)
    if (!faved){
        notFound();
    }

    const handleSave = async (notes) => {
        "use server";
        // TODO: call a fetch function that updates saved notes
        const result = await patchFavouriteNotes({params: {notes: notes, id: faved.favouritesId}})
    }

    return (
        <article>
            <PageHeader />
            <h2>Artwork</h2>
            <h1>{artwork.title}</h1>
            <p>{artwork.shortDescription}</p>
            <p>Artist: {artwork.artist}</p>
            <p>Date: {artwork.date}</p>
            <p>Location: {artwork.creationLocation}</p>
            
            <ArtworkEdit artwork={faved} handleSave={handleSave}/>
        </article>
    )
}