"use client";

import { addInterestEvent } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

import { toast } from "react-toastify";

const ActionButton = ({
  eventId,
  interestedUserIds,
  formDetails,
  goingUserIds,
}) => {
  const { auth } = useAuth();
  const isInterested = interestedUserIds.find((id) => id === auth?.id);
  const isGoing = goingUserIds?.find((id) => id === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [isPending, startTransition] = useTransition();
  const [going, setGoing] = useState(isGoing);
  const router = useRouter();

  async function toggleInterest() {
    if (auth) {
      await addInterestEvent(eventId, auth?.id);
      setInterested(!interested);
      if (!interested) {
        toast.success("Hopefully, We are Counting You 🤗");
      } else {
        toast.success("See you Soon");
      }
    } else {
      router.push("/login");
      toast.error("Please Login");
    }
  }

  const markGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      toast.error("Please Login");
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${formDetails && "flex-1"}`}>
      <button
        onClick={() =>
          startTransition(() => {
            toggleInterest();
          })
        }
        className={`w-full ${
          interested && "bg-indigo-600 hover:bg-indigo-800"
        }`}
      >
        Interested
      </button>
      <button
        disabled={auth && going}
        onClick={markGoing}
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  );
};

export default ActionButton;
