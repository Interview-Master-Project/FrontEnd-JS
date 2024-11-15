"use client";

import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import Info from "./Info";
import styles from "./header.module.scss";

type Props = {
  data: IData;
  collId: string;
  quizId: string;
};

export default function Header({ data, collId, quizId }: Props) {
  const { quizzes } = useLatestQuizzesAttemptStore();

  const targetQuiz = data.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
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
