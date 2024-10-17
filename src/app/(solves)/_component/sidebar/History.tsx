"use client";

import { useParams } from "next/navigation";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import styles from "./history.module.scss";

export default function History({ data }: { data: IData }) {
  const { quizId } = useParams();

  // 현재 퀴즈의 인덱스
  const currQuizIdx = data.getQuizzesWithAttemptByCollectionId.findIndex(
    (item) => item.quiz.id === quizId
  );

  const currHistory =
    data.getQuizzesWithAttemptByCollectionId[currQuizIdx].recentAnswerAt;

  const currHistoryRenderer = `${currHistory?.slice(
    0,
    10
  )} ${currHistory?.slice(11, 19)}`;

  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeader}>
        <span>이 문제에 대한 내 히스토리</span>
      </div>
      <span>{currHistory ? currHistoryRenderer : "풀이 기록이 없습니다."}</span>
    </div>
  );
}
