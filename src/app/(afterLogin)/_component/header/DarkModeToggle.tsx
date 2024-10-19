"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdDarkMode as DarkModeIcon,
  MdLightMode as LightModeIcon,
} from "react-icons/md";
import styles from "./darkModeToggle.module.scss";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // CSR 시점에 테마 초기화
  useEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = setTheme;
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    if (theme) {
      const newTheme = isDark ? "light" : "dark";
      window?.__setPreferredTheme(newTheme);
    }
  };

  // theme 초기화 전일 경우
  if (!theme) return null;

  return (
    <div
      onClick={toggleTheme}
      className={`cursor-pointer w-32 h-16 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center align-center ${styles.toggle}`}
    >
      <AnimatePresence initial={false} mode="wait">
        {!isDark ? (
          <motion.div
            key="dark"
            initial={{ x: -40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center"
          >
            <DarkModeIcon size={32} color="black" />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ x: -40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
          >
            <LightModeIcon size={32} color="white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
