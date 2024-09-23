"use client";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserCheck = () => {
  const { auth, setAuth } = useAuth();
  const route = useRouter();
  const logout = () => {
    setAuth(null);
    route.push("/");
  };
  return (
    <div>
      {auth ? (
        <>
          <span className=" text-gray-100 ">{auth?.name}</span>
          <span> | </span>
          <Link href={"/"} className="cursor-pointer" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </div>
  );
};

export default UserCheck;
