"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import TextareaAutosize from "react-textarea-autosize";
import {
  IoMdArrowDropdown as DownIcon,
  IoMdArrowDropup as UpIcon,
} from "react-icons/io";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import { useClientMutation } from "@/hooks/useClientMutation";
import { SOLVE_QUIZZES } from "@/graphql/mutation/solve-quizzes";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./solveZone.module.scss";
import { useClientFetch } from "@/hooks/useClientFetch";

type Props = {
  collId: string;
  quizId: string;
  userCollectionAttemptId: string;
};

export default function SolveZone({
  collId,
  quizId,
  userCollectionAttemptId,
}: Props) {
  const { quizzes, addQuizzes } = useLatestQuizzesAttemptStore();
  const [clicked, setClicked] = useState(
    quizzes.find(({ quiz }) => quiz.id === quizId)?.isCorrect !== undefined
  );
  console.log(quizzes);
  const [isOpen, setIsOpen] = useState(false);

  const { data, refetch } = useClientFetch<IData>(
    GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    {
      variables: {
        collectionId: collId,
      },
    },
    true
  );

  const handleOpen = () => setIsOpen(!isOpen);

  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  );

  // 맞은 개수, 틀린 개수
  const correctCnt = targetQuiz?.totalCorrectAttempts || 0;
  const inCorrectCnt =
    (targetQuiz?.totalAttempts || 0) - (targetQuiz?.totalCorrectAttempts || 0);

  const { mutate: solvedMutate } = useClientMutation(SOLVE_QUIZZES, {}, true);

  const handleCorrectCnt = async (isCorrect: boolean) => {
    const newCorrectElement = { quiz: { id: quizId }, isCorrect };
    addQuizzes(newCorrectElement);

    setClicked(true);

    // mutation 실행
    await solvedMutate({
      variables: {
        quizResults: {
          quizId: newCorrectElement.quiz.id,
          correct: newCorrectElement.isCorrect,
        },
        userCollectionAttemptId,
      },
      onCompleted: () => {
        // 쿼리 다시 가져오기
        refetch();
      },
    });
  };

  return (
    <main className={styles.solveZoneWrapper}>
      <section>
        <div className={styles.solveHeader}>
          <div className={styles.questionMark}>Q.</div>
          <h6>{targetQuiz?.quiz.question}</h6>
        </div>
        <div className={styles.solveContent}>
          <TextareaAutosize />
          <div
            className={styles.solveAnswerDropdown}
            role="button"
            onClick={handleOpen}
          >
            <div className={styles.dropdownTab}>
              퀴즈 해설 보기
              {isOpen ? <UpIcon /> : <DownIcon />}
            </div>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
                style={{ overflow: "hidden" }}
              >
                <p>{targetQuiz?.quiz.answer}</p>
              </motion.div>
            )}
          </div>
        </div>
        <div className={styles.solveNav}>
          <ContainedButton
            disabled={clicked}
            onClick={() => handleCorrectCnt(true)}
          >
            맞았어요 {correctCnt}
          </ContainedButton>
          <OutlinedButton
            disabled={clicked}
            variant="red"
            onClick={() => handleCorrectCnt(false)}
          >
            틀렸어요 {inCorrectCnt}
          </OutlinedButton>
        </div>
      </section>
    </main>
  );
}
