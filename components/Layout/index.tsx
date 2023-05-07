"use client";
import { Fragment, createContext } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Provider } from "react-redux";
import { store } from "@/store";

interface LayoutProps {
  children: React.ReactNode;
}

const products = createContext(null);

export function Layout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Provider>
    </Fragment>
  );
}
