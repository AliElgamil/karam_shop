"use client";
import { header } from "../styles";
import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.webp";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import SideBar from "./SideBar";
import CartModal from "../cartModal";
import { SHOP } from "@/routes";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const navItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: `${SHOP}1`,
  },
  {
    name: "Cart",
    path: `${SHOP}cart`,
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const windowScrollClear = setTimeout(() => {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 40) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      });
    }, 500);

    return () => clearTimeout(windowScrollClear);
  }, []);

  const toggleSearchBox = () => setSearchBox(!searchBox);
  return (
    <header
      className={`z-20 left-0 w-full text-head-color ${
        sticky ? "fixed top-0" : "absolute top-[40px]"
      }`}
    >
      <div
        className={`${header.headerContainer} ${
          sticky
            ? "w-[100%] max-w-[100%]"
            : "w-[95%] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px]"
        }`}
      >
        <div className="container m-auto">
          <nav className=" relative z-10">
            <div className="flex justify-between items-center bg-white w-full p-4">
              <div className="logo">
                <Link href="/">
                  <Image src={logo} alt="logo" priority />
                </Link>
              </div>

              <ul className="nav-item flex gap-4 items-center justify-center touch:hidden">
                <NavItem navItems={navItem} />
                <li className="relative">
                  <CartModal />
                </li>
                <li>
                  <button
                    className={`${header.navBtn} ${
                      searchBox ? "text-main-color" : ""
                    } hover:text-main-color`}
                    onClick={toggleSearchBox}
                    type="button"
                  >
                    <MagnifyingGlassIcon className="w-6 h-6" />
                  </button>
                </li>
              </ul>

              <div className="lg:hidden flex gap-4">
                <span>
                  <CartModal />
                </span>

                <button
                  className={`${header.navBtn} ${
                    searchBox ? "text-main-color" : ""
                  }`}
                  onClick={toggleSearchBox}
                  type="button"
                >
                  <span className="hidden">icon</span>
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
                <button
                  className={`block lg:hidden ${header.navBtn} hover:text-main-color`}
                  onClick={() => setSidebar(true)}
                  type="button"
                >
                  <span className="hidden">icon</span>
                  <Bars3Icon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Search Box */}
        <div
          className={`${searchBox ? "translate-y-full" : "translate-y-0"} ${
            header.inputSearch
          }`}
        >
          <input
            type="text"
            className={header.input}
            placeholder="Search Here..."
          />
          <button
            className="text-white px-4"
            onClick={toggleSearchBox}
            type="button"
          >
            <span className="hidden">icon</span>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <SideBar navItem={navItem} sidebar={sidebar} setSidebar={setSidebar} />
    </header>
  );
}
