"use client";
import { header } from "../styles";
import Link from "next/link";
import React, { Fragment } from "react";
type navItem = {
  navItems: {
    name: string;
    path: string;
  }[];
  setSidebar?: (value: boolean) => void;
};
export default function NavItem({ navItems, setSidebar }: navItem) {
  return (
    <Fragment>
      {navItems.map((navItem, ind) => (
        <li
          key={ind}
          className="lg:mx-4"
          onClick={setSidebar ? () => setSidebar(false) : () => {}}
        >
          <Link
            href={navItem.path}
            className={header.navItemClass}
            data-text={navItem.name}
          >
            {navItem.name}
          </Link>
        </li>
      ))}
    </Fragment>
  );
}
