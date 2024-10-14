"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID } from "@/graphql/query";
import { ISolvesInfo } from "@/model/solves-info";
import { useState } from "react";
import styles from "./footer.module.scss";
import Button from "@/app/_component/Button";

export default function Footer() {
  const params = useParams<{ collId: string; quizId: string }>();
  const [problemIdx, setProblemIdx] = useState(0);

  const { data } = useQuery<ISolvesInfo>(
    GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    {
      variables: {
        collectionId: params.collId,
      },
    }
  );

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLeft}>
        <Image
          src={
            data?.getQuizzesWithAttemptByCollectionId[problemIdx].quiz
              .collection.imgUrl as string
          }
          alt="임시 이미지"
          width={45}
          height={45}
          style={{
            objectFit: "cover",
          }}
        />
        <span>
          {
            data?.getQuizzesWithAttemptByCollectionId[problemIdx].quiz
              .collection.name
          }
        </span>
        <span>{">"}</span>
        <span>
          {data?.getQuizzesWithAttemptByCollectionId[problemIdx].quiz.question}
        </span>
      </div>
      <div className={styles.footerCenter}>
        <button
          onClick={() => setProblemIdx(problemIdx + 1)}
          disabled={
            data?.getQuizzesWithAttemptByCollectionId.length! - 1 === problemIdx
          }
        >
          다음
        </button>
      </div>
      <div className={styles.footerRight}>
        <span>
          {data?.getQuizzesWithAttemptByCollectionId[problemIdx].quiz.access}
        </span>
        <span>
          {
            data?.getQuizzesWithAttemptByCollectionId[problemIdx].quiz
              .collection.category.name
          }
        </span>
        <Button contained={false} variant="red" className={styles.endBtn}>
          <Link href="/home">종료</Link>
        </Button>
      </div>
    </div>
  );
}
