"use client";

import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import {
  AiOutlineCheck as VMark,
  AiOutlineClose as XMark,
} from "react-icons/ai";
import styles from "./list.module.scss";

type Props = {
  quizzes: GetQuizzesWithAttemptByCollectionIdQuery["getQuizzesWithAttemptByCollectionId"];
  onClickList: (idx: number) => void;
};

export default function List({ quizzes, onClickList }: Props) {
  const { quizzes: solvedQuizzes } = useLatestQuizzesAttemptStore();

  return (
    <ol className={styles.listWrapper}>
      {quizzes.map(({ quiz }, idx) => {
        let isCorrect = solvedQuizzes.find(
          (el) => el.quiz.id === quiz?.id
        )?.isCorrect;

        return (
          <li key={quiz?.id} onClick={() => onClickList(idx)}>
            <span className={styles.listIndex}>
              {(idx + 1).toString().padStart(2, "0")}
            </span>
            <span className={styles.listQuestion}>{quiz?.question}</span>
            <span>
              {isCorrect !== undefined &&
                (isCorrect ? (
                  <VMark style={{ fill: "green" }} />
                ) : (
                  <XMark style={{ fill: "red" }} />
                ))}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
