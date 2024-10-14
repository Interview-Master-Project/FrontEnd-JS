"use client";

import { useQuery } from "@apollo/client";
import { GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID } from "@/graphql/query";
import { ISolvesInfo } from "@/model/solves-info";
import styles from "./page.module.scss";

type Props = {
  params: { collId: string; quizId: string };
};

export default function Page({ params }: Props) {
  const { collId, quizId } = params;
  const { data } = useQuery<ISolvesInfo>(
    GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    {
      variables: {
        collectionId: params.collId,
      },
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.solveZone}>
        <h3>{data?.getQuizzesWithAttemptByCollectionId[2].quiz.question}</h3>
        <p>{data?.getQuizzesWithAttemptByCollectionId[2].quiz.answer}</p>
      </div>
    </div>
  );
}
