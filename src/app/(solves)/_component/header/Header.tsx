"use client";

import { GetQuizzesWithAttemptByCollectionIdForHeaderQuery } from "@/__api__/types";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import Info from "./Info";
import styles from "./header.module.scss";

type Props = {
  data: GetQuizzesWithAttemptByCollectionIdForHeaderQuery;
  collId: string;
  quizId: string;
};

export default function Header({ data, collId, quizId }: Props) {
  const { quizResults: quizzes } = useLatestQuizzesAttemptStore();

  const targetQuiz = data.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz?.id === quizId
  )?.quiz;

  const quizLen = data.getQuizzesWithAttemptByCollectionId.length;

  return (
    <header className={styles.headerContainer}>
      <Info targetQuiz={targetQuiz} />
      <div className={styles.progressContainer}>
        <progress
          id="progress"
          value={quizzes.length.toString()}
          max={quizLen.toString()}
        ></progress>
      </div>
    </header>
  );
}
