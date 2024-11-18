"use client";

import { motion } from "framer-motion";
import { exit } from "process";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={"initial"}
      animate={"enter"}
      exit={"exit"}
      variants={{
        exit: {
          opacity: 0,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        },
        enter: {
          opacity: 1,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        },
        initial: {
          opacity: 0,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        },
      }}
      className="relative"
    >
      {/* <motion.div className="absolute top-0 left-0 right-0 h-2  bg-white z-[100]">
        <motion.div
          initial={{ width: 0 }}
          exit={{ width: "100%" }}
          className="h-full bg-main-color"
          animate={{
            width: "100%",
            transition: { duration: 1, ease: "easeInOut" },
          }}
        />
      </motion.div> */}
      {children}
    </motion.div>
  );
}
