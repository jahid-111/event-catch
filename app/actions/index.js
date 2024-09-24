"use server";

import EmailTemplate from "@/components/payment/EmailTemplate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const {
  createUser,
  findUserByCredential,
  updateInterest,
  updateGoing,
  getEventById,
} = require("@/db/queries");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);

  const created = await createUser(user);
  if (created) {
    redirect("/login");
  } else {
    throw new Error("User creation failed");
  }
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredential(credential);
    return found;
  } catch (error) {
    throw new Error(`User not valid with "${formData.get("email")}"`);
  }
}

async function addInterestEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;

    const sent = await resend.emails.send({
      from: "noreply@dev.jahid.io",
      to: user?.email,
      subject: "Successfully Registered EventCatch",
      react: EmailTemplate({ message }),
    });
    return sent;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export {
  registerUser,
  performLogin,
  addInterestEvent,
  addGoingEvent,
  sendEmail,
};
