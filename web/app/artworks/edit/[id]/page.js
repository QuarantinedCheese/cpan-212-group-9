import { notFound } from "next/navigation";
import PageHeader from "@/app/components/header";
// TODO: display an edit form for an art piece that allows the user to 
// change the notes they applied to a piece.
// Should be navigated to from an existing art piece (not the temp homepage)
export default async function editPage({params}) {
    const {id} = await params;
    // const artwork = await - TODO: get the neccessary artwork by ID.

    // if (!artwork){ uncomment when implemented
    //     notFound();
    // }

    return (
        <article>
            <PageHeader />
            <h2>Artwork</h2>
        </article>
    )
}