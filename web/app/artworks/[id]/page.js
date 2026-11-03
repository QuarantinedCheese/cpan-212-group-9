import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/app/components/header";

// TODO: make this page display expanded details for an artpiece.
// There should be a button to favourite the piece, and send them to the edit page with the appropriate ID

async function getArtworkById(id) {
  const res = await fetch(`http://localhost:4000/api/artwork/${id}`, {
    cache: "no-store",
  });

 
  if (res.status === 404) 
    return null;
 
 if (!res.ok) {
        throw new Error("Failed to fetch artwork");
}

const result = await res.json();
console.log("Artwork result", result);

return result.data;
}
export default async function ArtPage({params}) {
    const {id} = await params;
    console.log("Artwork ID", id);
    // const artwork = await - TODO: get the neccessary artwork by ID.

    // if (!artwork){ uncomment when implemented
    //     notFound();
    // }
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

            <Link href={`/artworks/edit/${id}`}>Edit Artwork</Link>
        </main>
        </>
    );
}
      