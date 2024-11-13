"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import TextareaAutosize from "react-textarea-autosize";
import {
  IoMdArrowDropdown as DownIcon,
  IoMdArrowDropup as UpIcon,
} from "react-icons/io";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./solveZone.module.scss";

type Props = {
  data: IData;
  quizId: string;
};

export default function SolveZone({ data, quizId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  )?.quiz;

  return (
    <main className={styles.solveZoneWrapper}>
      <section>
        <div className={styles.solveHeader}>
          <div className={styles.questionMark}>Q.</div>
          <h6>{targetQuiz?.question}</h6>
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
                <p>{targetQuiz?.answer}</p>
              </motion.div>
            )}
          </div>
        </div>
        <div className={styles.solveNav}>
          <ContainedButton>맞았어요 1</ContainedButton>
          <OutlinedButton variant="red">틀렸어요 0</OutlinedButton>
        </div>
      </section>
    </main>
  );
}
