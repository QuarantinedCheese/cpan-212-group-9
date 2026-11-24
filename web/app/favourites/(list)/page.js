import PageHeader from "@/app/components/header";
import FavouritesSearch from "@/app/components/search-favs";



export const metadata={
    title: 'Browse'
};

// TODO: Have this page display a list of artworks
// Should also make it able to display only favourites if toggled.


// Routed by /artworks
export default function ArtworksListPage() {
    return (
        <>
        <PageHeader></PageHeader>
        <h1>Browse Favourites</h1>
        <main>
            <FavouritesSearch/>
        </main>
        </>
    );
}
