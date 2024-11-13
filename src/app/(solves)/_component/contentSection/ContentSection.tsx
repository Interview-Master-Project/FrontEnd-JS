"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { useSwitchStore } from "@/store/useSwitchStore";

export default function ContentSection({ children }: PropsWithChildren) {
  const { isOpen } = useSwitchStore();

  return (
    <motion.div
      initial={!isOpen && { width: "100dvw" }}
      animate={{ width: isOpen ? "calc(100dvw - 320px)" : "100dvw" }}
      transition={{ type: "tween", duration: 0.3, stiffness: 200 }}
    >
      {children}
    </motion.div>
  );
}
