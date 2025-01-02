"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApolloClient } from "@apollo/client";
import { GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID } from "@/graphql/query/get-quizzes-by-collection-id";
import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";
import TextareaAutosize from "react-textarea-autosize";
import {
  IoMdArrowDropdown as DownIcon,
  IoMdArrowDropup as UpIcon,
} from "react-icons/io";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import { useClientFetch } from "@/hooks/useClientFetch";
import { useSolveQuizLog } from "@/store/useSolveQuizLog";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "./solveZone.module.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  collId: string;
  quizId: string;
};

export default function SolveZone({ collId, quizId }: Props) {
  const client = useApolloClient();
  const { quizzes, addQuizzes, removeQuizzes } = useLatestQuizzesAttemptStore();
  const [clicked, setClicked] = useState(
    quizzes.find(({ quiz }) => quiz.id === quizId)?.isCorrect !== undefined
  );

  const [isOpen, setIsOpen] = useState(false);

  const { data, refetch } =
    useClientFetch<GetQuizzesWithAttemptByCollectionIdQuery>(
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
    ({ quiz }) => quiz?.id === quizId
  );

  // 맞은 개수, 틀린 개수
  const correctCnt = targetQuiz?.totalCorrectAttempts || 0;
  const inCorrectCnt =
    (targetQuiz?.totalAttempts || 0) - (targetQuiz?.totalCorrectAttempts || 0);
  const { addLog, removeLog } = useSolveQuizLog();

  const handleCorrectCnt = (isCorrect: boolean) => {
    const newCorrectElement = { quiz: { id: quizId }, isCorrect };
    addQuizzes(newCorrectElement);

    setClicked(true);

    // 맞은 개수 / 틀린 개수 UI 업데이트
    client.cache.updateQuery(
      {
        query: GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
        variables: { collectionId: collId },
      },
      (data) => {
        if (!data) return data;

        // 특정 quizId에 해당하는 데이터 수정
        const updatedQuizzes = data.getQuizzesWithAttemptByCollectionId.map(
          (quizAttempt: any) => {
            if (quizAttempt.quiz.id === quizId) {
              return {
                ...quizAttempt,
                totalAttempts: quizAttempt.totalAttempts + 1,
                totalCorrectAttempts: isCorrect
                  ? quizAttempt.totalCorrectAttempts + 1
                  : quizAttempt.totalCorrectAttempts,
                recentAnswerAt: dayjs()
                  .tz("Asia/Seoul")
                  .format("YYYY-MM-DDTHH:mm:ssZ"),
              };
            }
            return quizAttempt;
          }
        );

        return {
          ...data,
          getQuizzesWithAttemptByCollectionId: updatedQuizzes,
        };
      }
    );

    addLog({
      quizId: newCorrectElement.quiz.id,
      correct: newCorrectElement.isCorrect,
      answeredAt: dayjs().tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ssZ"),
    });
  };

  const handleReset = () => {
    removeQuizzes(quizId);
    setClicked(false);

    // 카운트에 대한 UI 업데이트
    refetch();

    removeLog(quizId);
  };

  return (
    <main className={styles.solveZoneWrapper}>
      <section>
        <div className={styles.solveHeader}>
          <div className={styles.questionMark}>Q.</div>
          <h6>{targetQuiz?.quiz?.question}</h6>
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
                <p className={styles.answerParagraph}>
                  {targetQuiz?.quiz?.answer}
                </p>
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
          <span
            className={styles.resetBtn}
            hidden={!clicked}
            onClick={handleReset}
          >
            선택 초기화
          </span>
        </div>
      </section>
    </main>
  );
}
