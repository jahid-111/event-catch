"use server";

const { createUser } = require("@/db/queries");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);

  const created = await createUser(user);
  if (created) {
    redirect("/login");
  } else {
    throw new Error("User creation failed");
  }
}

export { registerUser };
