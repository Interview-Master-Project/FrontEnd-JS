"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { calculateCorrectRate } from "@/app/(afterLogin)/explore/_lib/calculateCorrectRate";
import styles from "./quiz.module.scss";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  recentAnswerAt: string;
  totalAttempts: number;
  totalCorrectAttempts: number;
};

export default function QuizProgress({
  recentAnswerAt,
  totalAttempts,
  totalCorrectAttempts,
}: Props) {
  const { totalRate } = calculateCorrectRate({
    totalAttempts,
    totalCorrectAttempts,
  });

  return (
    <div className={`${styles.quizSection} ${styles.quizSection__progress}`}>
      {totalRate !== null ? (
        <>
          <span>
            정답률 {totalRate}% ({totalCorrectAttempts} / {totalAttempts})
          </span>
          <progress value={totalRate} max={100}></progress>
        </>
      ) : (
        <span>풀이 기록이 없어요!</span>
      )}
      {recentAnswerAt && (
        <span>{`Updated ${dayjs(recentAnswerAt).fromNow()}`}</span>
      )}
    </div>
  );
}
