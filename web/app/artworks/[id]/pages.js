import { notFound } from "next/navigation";

// TODO: make this page display expanded details for an artpiece.
// There should be a button to favourite the piece, and send them to the edit page with the appropriate ID
export default async function ArtPage({params}) {
    const {id} = await params;
    // const artwork = await - TODO: get the neccessary artwork by ID.

    // if (!artwork){ uncomment when implemented
    //     notFound();
    // }

    return (
        <article>
            <h2>Artwork</h2>
        </article>
    )
}