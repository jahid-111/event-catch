"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const {
  createUser,
  findUserByCredential,
  updateInterest,
  updateGoing,
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

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    throw error;
  }
}

export { registerUser, performLogin, addInterestEvent, addGoingEvent };
