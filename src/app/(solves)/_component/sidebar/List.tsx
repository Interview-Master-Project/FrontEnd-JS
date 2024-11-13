"use client";

import { IQuizzes } from "@/graphql/query/get-quizzes-by-collection-id";
import styles from "./list.module.scss";

type Props = {
  quizzes: IQuizzes[];
  onClickList: (idx: number) => void;
};

export default function List({ quizzes, onClickList }: Props) {
  return (
    <ol className={styles.listWrapper}>
      {quizzes.map(({ quiz }, idx) => (
        <li key={quiz.id} onClick={() => onClickList(idx)}>
          <span className={styles.listIndex}>
            {(idx + 1).toString().padStart(2, "0")}
          </span>
          <span className={styles.listQuestion}>{quiz.question}</span>
        </li>
      ))}
    </ol>
  );
}
