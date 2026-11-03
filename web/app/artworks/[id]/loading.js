import PageHeader from "@/components/PageHeader";


export default function Loading() {
  return (
    <>
      <PageHeader />
      <main>
        <p role="status">Loading artwork...</p>
      </main>
    </>
  );
}