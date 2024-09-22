"use server";

import { redirect } from "next/navigation";

const { createUser, findUserByCredential } = require("@/db/queries");

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
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");
  const found = await findUserByCredential(credential);

  if (found) {
    redirect("/");
  } else {
    throw new Error(`User not valid with "${formData.get("email")}"`);
  }
}
export { registerUser, performLogin };
