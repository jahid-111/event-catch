"use client";
import { performLogin } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const userFound = await performLogin(formData);

      if (userFound) {
        setAuth(userFound);
        router.push("/");
      } else {
        setError("not valid");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div>
        <h5 className="text-2xl text-red-400 text-center">{error}</h5>
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
