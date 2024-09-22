import React from "react";
import CardEvent from "./CardEvent";
import { getAllEvent } from "@/db/queries";

const EventList = async () => {
  const events = await getAllEvent();
  // console.log("List events :", events);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {events.map((event) => (
        <CardEvent key={event.key} event={event} />
      ))}
    </div>
  );
};

export default EventList;
