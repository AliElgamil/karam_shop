"use client";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";
import logo from "public/logo.webp";
import { header } from "../styles";

type navItem = {
  navItem: {
    name: string;
    path: string;
  }[];
  sidebar: boolean;
  setSidebar: (value: boolean) => void;
};

export default function SideBar({ navItem, sidebar, setSidebar }: navItem) {
  return (
    <div
      className={`${header.sidebar} ${
        sidebar ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0"
      } lg:hidden`}
    >
      <div
        className="bg-[rgba(0,0,0,.7)] absolute inset-0 -z-10 block lg:hidden"
        onClick={() => setSidebar(false)}
      ></div>
      <div className="bg-white w-[300px] lg:w-auto items-center justify-between flex text-center flex-col py-4">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="logo" priority />
          </Link>
        </div>
        <ul className="nav-item flex lg:flex-row flex-col gap-4 ">
          <NavItem navItems={navItem} setSidebar={setSidebar} />
        </ul>
        <div></div>
      </div>
    </div>
  );
}
