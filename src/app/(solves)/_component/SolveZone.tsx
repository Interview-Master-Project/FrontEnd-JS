"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import TextareaAutosize from "react-textarea-autosize";
import Button from "@/app/_component/Button";
import styles from "./solveZone.module.scss";

export default function SolveZone({ data }: { data: IData }) {
  const { quizId } = useParams();
  const [showAnswer, setShowAnswer] = useState(false);

  // 해당하는 퀴즈 정보 찾기
  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    (item) => item.quiz.id === quizId
  );

  const [correctCnt, setCorrectCnt] = useState(
    targetQuiz?.totalCorrectAttempts
  );
  const [wrongCnt, setWrongCnt] = useState(
    targetQuiz?.totalCorrectAttempts
      ? targetQuiz?.totalAttempts - targetQuiz?.totalCorrectAttempts
      : 0
  );

  const [clicked, setClicked] = useState(false);

  const handleCorrectClick = () => {
    setCorrectCnt((prev) => prev! + 1);
    setClicked(true); // 클릭 후 두 버튼 모두 비활성화
  };

  const handleWrongClick = () => {
    setWrongCnt((prev) => prev! + 1);
    setClicked(true); // 클릭 후 두 버튼 모두 비활성화
  };

  return (
    <div className={styles.solveZone}>
      <div className={styles.question}>
        <span style={{ fontSize: 32, color: "blue" }}>Q</span>
        <h3>{targetQuiz?.quiz.question}</h3>
      </div>
      <div>
        <TextareaAutosize className={styles.textarea} />
      </div>
      <div onClick={() => setShowAnswer(!showAnswer)}>
        <span className={styles.activeAnswer}>
          {showAnswer ? "답변 숨기기" : "답변 보기"}
        </span>
        {showAnswer && (
          <p className={styles.answer}>{targetQuiz?.quiz.answer}</p>
        )}
      </div>
      <div className={styles.correctCheckZone}>
        <Button
          variant="green"
          disabled={clicked}
          onClick={handleCorrectClick}
        >{`맞았어요 ${correctCnt ?? 0}`}</Button>
        <Button disabled={clicked} variant="red" onClick={handleWrongClick}>
          {`틀렸어요 ${wrongCnt ?? 0}`}
        </Button>
      </div>
    </div>
  );
}
