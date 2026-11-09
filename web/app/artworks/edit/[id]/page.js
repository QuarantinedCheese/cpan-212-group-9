import PageHeader from "@/app/components/header";
import ArtworkEdit from "@/app/components/edit-artwork";
import { notFound } from "next/navigation";
import { getArtworkById } from "@/app/lib/artworks";

export const instant = false;


export default async function editPage({params}) {
    const {id} = await params;
    const artwork = await getArtworkById(id);

    if (!artwork){
        notFound();
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
            
            <ArtworkEdit artwork={artwork}/>
        </article>
    )
}