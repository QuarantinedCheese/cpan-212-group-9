import PageHeader from "@/app/components/header";

export const metadata={
    title: 'Browse'
};

// TODO: Have this page display a list of artworks
// Should also make it able to display only favourites if toggled.

// Routed by /artworks
export default function artworksList() {
    return(
        <>
        <PageHeader></PageHeader>
        <h1>Art Browsing</h1>
        </>
    )
}