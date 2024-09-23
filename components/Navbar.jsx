import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserCheck from "./auth/UserCheck";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Eventry"
              height={135}
              width={135}
            />
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>
            <UserCheck />
          </li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
