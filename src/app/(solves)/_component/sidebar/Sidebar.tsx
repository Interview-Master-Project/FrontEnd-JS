"use client";

import { useSwitchStore } from "@/store/useSwitchStore";
import { motion } from "framer-motion";
import styles from "./sidebar.module.scss";

type Props = {
  collId: string;
  quizId: string;
};

export default function Sidebar({ collId, quizId }: Props) {
  const { isOpen, close } = useSwitchStore();

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 250 : 0 }}
      transition={{ type: "tween", duration: 0.3, stiffness: 300 }}
      className={styles.sidebar}
    >
      <button onClick={close} className={styles.closeBtn}>
        X
      </button>
      <span>컨텐츠!</span>
    </motion.div>
  );
}
