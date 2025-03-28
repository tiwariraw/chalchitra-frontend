"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../app/redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Reload the page when clicking on the logo
  const handleImgClick = () => {
    router.refresh();
  };

  return (
    <div
      className={`z-50 header w-full absolute z-10 bg-gradient-to-b from-black px-8 py-6 flex justify-between items-center navbar-parent`}
    >
      <h1 className="chalchitra-logo cursor-pointer" onClick={handleImgClick}>
        CHALCHITRA
      </h1>

      {/* on click of this avatar icon show the profile route */}
      <ul className="flex justify-center items-center gap-10">
        <li>
          <Link href="/tv" className="link">
            TV Shows
          </Link>
        </li>
        <li>
          <Link href="/movies" className="link">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/my-list" className="link">
            Watch List
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <Image
              src={"/default_avatar.png"}
              alt="user-icon"
              className="w-10 cursor-pointer hover:opacity-80 transition-opacity duration-200 hover:ring-2 hover:ring-gray-400"
              width={40}
              height={40}
            />
          </Link>
        </li>
        <li>
          <button className="logout-btn" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
