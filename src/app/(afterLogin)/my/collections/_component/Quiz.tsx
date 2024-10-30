"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GET_QUIZ_BRIEF,
  IBriefData as IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { useClientFetch } from "@/hooks/useClientFetch";
import { motion } from "framer-motion";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import { calculateCorrectRate } from "@/app/(afterLogin)/explore/_lib/calculateCorrectRate";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styles from "./quiz.module.scss";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  collectionId: string;
  quizId: string;
  quizIndex: number;
};

export default function Quizzes({ collectionId, quizId, quizIndex }: Props) {
  const { data, loading, error } = useClientFetch<IData>(
    GET_QUIZ_BRIEF,
    {
      variables: {
        collectionId,
      },
    },
    true
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  );

  if (!targetQuiz) return <p>등록된 퀴즈가 없습니다.</p>;

  const { totalRate } = calculateCorrectRate({
    totalAttempts: targetQuiz.totalAttempts,
    totalCorrectAttempts: targetQuiz.totalCorrectAttempts,
  });

  return (
    <motion.div
      key={targetQuiz.quiz.id}
      className={styles.quizWrapper}
      whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
    >
      <div className={styles.dropdown}>
        <Dropdown onClose={handleOffDropdown}>
          <Dropdown.Active
            onClick={handleCloseDropdown}
            boxWidth={36}
            boxHeight={36}
          >
            <BsThreeDots />
          </Dropdown.Active>
          <Dropdown.Menu isOpen={isOpen} containerWidth={100}>
            <Dropdown.Item>
              <Link href={`/my/editquiz?id=${targetQuiz.quiz.id}`}>수정</Link>
            </Dropdown.Item>
            <Dropdown.Item variant="alert">
              <Link href="/explore">삭제</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={`${styles.quizSection} ${styles.quizSection__info}`}>
        <h6>{quizIndex.toString().padStart(2, "0")}</h6>
        <p className={styles.quizQuestion}>{targetQuiz.quiz.question}</p>
      </div>
      <div className={`${styles.quizSection} ${styles.quizSection__progress}`}>
        {totalRate ? (
          <>
            <span>정답률 {totalRate}%</span>
            <progress value={totalRate} max={100}></progress>
          </>
        ) : (
          <span>풀이 기록이 없어요!</span>
        )}
        <span>{`Updated ${dayjs(targetQuiz.quiz.updatedAt).fromNow()}`}</span>
      </div>
    </motion.div>
  );
}
