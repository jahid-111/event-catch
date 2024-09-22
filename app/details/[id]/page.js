import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";
import React from "react";

const DetailsPage = async ({ params: { id } }) => {
  const eventInfo = await getEventById(id);
  console.log("eventInfo", eventInfo);

  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section className="container">
        <div className="grid  grid-cols-5 gap-12 my-12">
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags} />
          <EventVenue location={eventInfo?.location} />
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
