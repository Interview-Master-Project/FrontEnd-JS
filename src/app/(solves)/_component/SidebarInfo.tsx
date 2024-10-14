"use client";

import { useQuery } from "@apollo/client";
import { PROBLEM_INFO } from "@/graphql/query";
import { IProblemInfo } from "@/model/problem-info";
import { useParams } from "next/navigation";
import styles from "./sidebarInfo.module.scss";

export default function SidebarInfo() {
  const params = useParams<{ collId: string; quizId: string }>();

  const { data } = useQuery<IProblemInfo>(PROBLEM_INFO, {
    variables: {
      collectionId: params.collId,
    },
  });

  return (
    <div className={styles.container}>
      <ul>
        {data?.getQuizzesWithAttemptByCollectionId.map(({ quiz }) => (
          <li key={quiz.id}>{quiz.question}</li>
        ))}
      </ul>
    </div>
  );
}
