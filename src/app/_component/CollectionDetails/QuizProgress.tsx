"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styles from "./quiz.module.scss";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  updatedAt: string;
  totalRate: number | null;
};

export default function QuizProgress({ updatedAt, totalRate }: Props) {
  return (
    <div className={`${styles.quizSection} ${styles.quizSection__progress}`}>
      {totalRate !== null ? (
        <>
          <span>정답률 {totalRate}%</span>
          <progress value={totalRate} max={100}></progress>
        </>
      ) : (
        <span>풀이 기록이 없어요!</span>
      )}
      <span>{`Updated ${dayjs(updatedAt).fromNow()}`}</span>
    </div>
  );
}
