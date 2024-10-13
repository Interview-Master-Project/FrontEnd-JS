"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID } from "@/graphql/query";
import { ISolvesInfo } from "@/model/solves-info";
import styles from "./footer.module.scss";

export default function Footer() {
  const params = useParams<{ collId: string; quizId: string }>();

  const { data } = useQuery<ISolvesInfo>(
    GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    {
      variables: {
        collectionId: params.collId,
      },
    }
  );

  console.log(params.collId);
  console.log(data?.getQuizzesWithAttemptByCollectionId[0].quiz.answer);

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLeft}>
        <Image src={logo} alt="임시 이미지" width={45} height={45} />
        {/* 컬렉션 name */}
        {/* 퀴즈 name */}
        left
      </div>
      <div className={styles.footerRight}>
        {/* 컬렉션 access */}
        {/* 컬렉션 category */}
        {/* 종료 버튼 */}
        <div>right</div>
      </div>
    </div>
  );
}
