import React from "react";
import CardEvent from "./CardEvent";

const EventList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <CardEvent />
    </div>
  );
};

export default EventList;
