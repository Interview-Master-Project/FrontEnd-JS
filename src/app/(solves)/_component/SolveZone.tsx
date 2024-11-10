"use client";

import { useSwitchStore } from "@/store/useSwitchStore";
import { motion } from "framer-motion";
import styles from "./solveZone.module.scss";

type Props = {
  collId: string;
  quizId: string;
};

export default function SolveZone({ collId, quizId }: Props) {
  const { isOpen } = useSwitchStore();

  return (
    <div className={styles.solveZoneWrapper}>
      <div>문제!</div>
    </div>
    // <motion.div
    //   animate={{ width: isOpen ? "calc(100% - 250px)" : "100%" }}
    //   transition={{ type: "tween", duration: 0.3, stiffness: 300 }}
    //   className={styles.solveZoneWrapper}
    // >
    //   <div>문제!</div>
    // </motion.div>
  );
}
