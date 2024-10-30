"use client";

import { IPageInfo } from "@/graphql/query/my-collections";
import { useRouter } from "next/navigation";
import ContainedButton from "@/app/_component/button/ContainedButton";
import styles from "./navigator.module.scss";

type Props = {
  pageInfo: IPageInfo;
};

export default function Navigator({ pageInfo }: Props) {
  const router = useRouter();

  // 미구현됨
  return (
    <div className={styles.navigator}>
      <ContainedButton
        // disabled={pageInfo.currentPage === 1}
        disabled
        onClick={() => router.push(`/my?sort=LATEST&offset=0`)}
      >
        이전
      </ContainedButton>
      <ContainedButton
        // disabled={!pageInfo.hasNextPage}
        disabled
        onClick={() => router.push(`/my?sort=LATEST&offset=5`)}
      >
        다음
      </ContainedButton>
    </div>
  );
}
