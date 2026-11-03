import PageHeader from "@/app/components/header";


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