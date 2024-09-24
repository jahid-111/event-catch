import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionButton from "../ActionButton";

const CardEvent = ({ event }) => {
  return (
    <div className=" h-[360px] relative overflow-hidden rounded-md bg-[#242526]">
      <Link href={`/details/${event?.id}`}>
        <Image
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-[200px] hover:grayscale"
          width={500}
          height={500}
        />
      </Link>

      <div className=" absolute w-full bottom-0 p-3">
        <Link
          href={`/details/${event?.id}`}
          className="font-bold hover:underline text-lg"
        >
          {event.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{event.location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{event?.interested_ids.length}Interested</span>
          <span className="mx-1"> | </span>
          <span>{event?.going_ids.length} Going</span>
        </div>

        <ActionButton
          eventId={event?.id}
          interestedUserIds={event?.interested_ids}
          goingUserIds={event?.going_ids}
        />
      </div>
    </div>
  );
};

export default CardEvent;
