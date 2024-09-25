import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import LoadingBar from "@/components/LoadingBar";
import { Suspense } from "react";

export default function Home({ searchParams: { query } }) {
  return (
    <section className="container">
      <Header />
      <Suspense key={query} fallback={<LoadingBar />}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
