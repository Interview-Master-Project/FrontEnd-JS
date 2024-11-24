"use client";

import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";
import { IDetailsProps } from "@/types/CollectionDetails/types";
import { motion } from "framer-motion";
import QuizInfoEditBtn from "./QuizInfoEditBtn";
import { calculateCorrectRate } from "@/app/(afterLogin)/explore/_lib/calculateCorrectRate";
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
  const { totalRate } = calculateCorrectRate({
    totalAttempts: quizElement?.totalAttempts!,
    totalCorrectAttempts: quizElement?.totalCorrectAttempts!,
  });

  return (
    <motion.div
      className={styles.quizWrapper}
      whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
    >
      <QuizInfoEditBtn
        isCreator={isCreator}
        collId={collId}
        quizElement={quizElement}
      />
      <div className={`${styles.quizSection} ${styles.quizSection__info}`}>
        <h6>{quizIdx.toString().padStart(2, "0")}</h6>
        <p className={styles.quizQuestion}>{quizElement?.quiz?.question}</p>
      </div>
      <QuizProgress
        updatedAt={quizElement.quiz?.updatedAt!}
        totalRate={totalRate}
      />
    </motion.div>
  );
}
