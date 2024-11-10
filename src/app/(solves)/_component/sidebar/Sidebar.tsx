"use client";

import { useSwitchStore } from "@/store/useSwitchStore";
import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "./sidebar.module.scss";

type Props = {
  collId: string;
  quizId: string;
};

export default function Sidebar({ collId, quizId }: Props) {
  const { isOpen, close } = useSwitchStore();

  return (
    <motion.div
      initial={{ width: 0, visibility: "hidden" }}
      animate={{
        width: isOpen ? 320 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
      transition={{ type: "tween", duration: 0.3, stiffness: 200 }}
      className={clsx(styles.sidebar, {
        [styles.sidebar__collapse]: !isOpen,
      })}
    >
      <button onClick={close} className={styles.closeBtn}>
        X
      </button>
      <span>01 퀴즈01</span>
    </motion.div>
  );
}
