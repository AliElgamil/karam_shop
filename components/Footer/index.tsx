"use client";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo-light.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={`bg-dark-color pt-[70px] pb-[50px] text-white`}>
      <div className="container m-auto pb-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Description */}
          <div className="flex flex-col">
            <Image src={logo} alt="logo" priority />
            <p className="mt-8 text-[.8rem] leading-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
              tenetur dolorem hic porro maxime odio corporis numquam assumenda
              animi repellat?
            </p>
          </div>

          {/* Delivery Time */}
          <div>
            <h2 className="font-bold mb-4 text-[1.2rem]">Delivery Time</h2>
            <p className="text-[.8rem] font-bold">Sunday - Thursday</p>
            <span className="text-[.8rem]">10:00am - 11:00pm</span>
            <p className="text-[.8rem] font-bold mt-4">Friday - saturday</p>
            <span className="text-[.8rem]">Day of</span>
          </div>

          <div>
            <h2 className="font-bold mb-4 text-[1.2rem]">Contact</h2>
            <address className="text-[.8rem] font-bold not-italic">
              Location: Gotham, wellStreet-21540, zackSnyder
            </address>
            <p className="text-[.8rem] font-bold mt-4">Phone: 011354734431</p>
            <p className="text-[.8rem] font-bold mt-4">
              Email: <Link href="mailto:host@gmail.com">host@gmail.com</Link>
            </p>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-[1.2rem]">Newsletter</h2>
            <p className="text-[.8rem]">Stay update with our latest</p>
            <div className="flex items-center mt-4 bg-white pl-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="bg-transparent outline-none grow text-head-color min-w-0"
              />
              <button
                type="button"
                className="gradient-btn font-bold text-[1.3rem] p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-[50px] flex flex-wrap justify-center sm:justify-between items-center gap-y-8">
          <p className="text-[.8rem]">
            ©Copyright - 2022, website made by Ali Elgamel, All Rights Reserved.
          </p>
          <div className="social_links d-flex items-center gap-4 justify-end">
            <span className="flex gap-2">
              <Link href="/error404">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link href="/error404">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link href="/error404">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link href="/error404">
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
