"use client";

import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";
import { IDetailsProps } from "@/types/CollectionDetails/types";
import QuizInfoEditBtn from "./QuizInfoEditBtn";
import QuizProgress from "./QuizProgress";
import styles from "./quiz.module.scss";

type quizElement<T> = T extends Array<infer U> ? U : never;

interface Props extends IDetailsProps {
  quizElement: quizElement<
    GetQuizzesWithAttemptByCollectionIdQuery["getQuizzesWithAttemptByCollectionId"]
  >;
  quizIdx: number;
}

export default function Quiz({
  isCreator,
  collId,
  quizElement,
  quizIdx,
}: Props) {
  return (
    <div className={styles.quizWrapper}>
      <QuizInfoEditBtn
        isCreator={isCreator}
        collId={collId}
        quizElement={quizElement}
      />
      <div className={`${styles.quizSection} ${styles.quizSection__info}`}>
        <h6>{(quizIdx + 1).toString().padStart(2, "0")}</h6>
        <p className={styles.quizQuestion}>{quizElement?.quiz?.question}</p>
      </div>
      <QuizProgress
        updatedAt={quizElement.quiz?.updatedAt!}
        totalAttempts={quizElement?.totalAttempts!}
        totalCorrectAttempts={quizElement?.totalCorrectAttempts!}
      />
    </div>
  );
}
