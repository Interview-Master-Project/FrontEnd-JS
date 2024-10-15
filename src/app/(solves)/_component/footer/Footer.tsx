"use client";

import Image from "next/image";
import Link from "next/link";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import { useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/app/_component/Button";
import styles from "./footer.module.scss";

export default function Footer({ data }: { data: IData }) {
  const { collId, quizId } = useParams<{ collId: string; quizId: string }>();
  const [pageIdx, setPageIdx] = useState(0);

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLeft}>
        <Image
          src={data.getQuizzesWithAttemptByCollectionId[pageIdx].quiz?.collection.imgUrl as string}
          alt="임시 이미지"
          width={45}
          height={45}
          style={{
            objectFit: "cover",
          }}
        />
        <span>{data.getQuizzesWithAttemptByCollectionId[pageIdx].quiz?.collection.name}</span>
        <span>{">"}</span>
        <span>{data.getQuizzesWithAttemptByCollectionId[pageIdx].quiz?.question}</span>
      </div>
      <div className={styles.footerCenter}>
        <Link
          href={`/collections/${collId}/quizzes/${
            data?.getQuizzesWithAttemptByCollectionId[pageIdx + 1].quiz.id
          }`}
          onClick={() => setPageIdx(pageIdx + 1)}
        >
          <button
            disabled={
              data?.getQuizzesWithAttemptByCollectionId.length! - 1 === pageIdx
            }
          >
            다음
          </button>
        </Link>
      </div>
      <div className={styles.footerRight}>
        <span>{data.getQuizzesWithAttemptByCollectionId[pageIdx].quiz?.collection.access}</span>
        <span>{data.getQuizzesWithAttemptByCollectionId[pageIdx].quiz?.collection.category.name}</span>
        <Button contained={false} variant="red" className={styles.endBtn}>
          <Link href="/home">종료</Link>
        </Button>
      </div>
    </div>
  );
}
