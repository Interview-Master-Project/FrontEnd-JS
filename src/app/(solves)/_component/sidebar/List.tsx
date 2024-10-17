"use client";

import { useParams } from "next/navigation";
import clsx from "clsx";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import styles from "./list.module.scss";

export default function List({ data }: { data: IData }) {
  const { quizId } = useParams();

  // 현재 퀴즈의 인덱스 + 1
  const currQuizIdxPlusOne =
    data.getQuizzesWithAttemptByCollectionId.findIndex(
      ({ quiz }) => quiz.id === quizId
    ) + 1;

  // 문제 수
  const quizLen = data.getQuizzesWithAttemptByCollectionId.length;

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>
        {data?.getQuizzesWithAttemptByCollectionId.map(({ quiz }, idx) => (
          <li
            key={quiz.id}
            className={clsx({
              [styles.activeQuiz]: quiz.id === quizId,
            })}
          >
            <span>{(idx + 1).toString().padStart(2, "0")}</span>
            <span>{quiz.question}</span>
          </li>
        ))}
      </ul>
      <div className={styles.progressContainer}>
        <span>
          {`진행도 ${Math.round((currQuizIdxPlusOne / quizLen) * 100)}%`}{" "}
          {`(${currQuizIdxPlusOne} / ${quizLen})`}
        </span>
        <progress
          value={currQuizIdxPlusOne.toString()}
          max={quizLen.toString()}
        ></progress>
      </div>
    </div>
  );
}
