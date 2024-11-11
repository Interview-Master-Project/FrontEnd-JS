"use client";

import { useSwitchStore } from "@/store/useSwitchStore";
import styles from "./solveZone.module.scss";

type Props = {
  collId: string;
  quizId: string;
};

export default function SolveZone({ collId, quizId }: Props) {
  const { isOpen } = useSwitchStore();

  return (
    <main className={styles.solveZoneWrapper}>
      <section>
        문제입니다.
      </section>
    </main>
  );
}
