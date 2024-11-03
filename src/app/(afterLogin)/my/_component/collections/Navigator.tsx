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
  return (
    <div className={styles.navigator}>
      <ContainedButton
        disabled={pageInfo.currentPage === 1}
        onClick={() =>
          router.push(
            `/my?sort=LATEST&offset=${(pageInfo.currentPage - 2) * 5}`,
            { scroll: false }
          )
        }
      >
        이전
      </ContainedButton>
      <ContainedButton
        disabled={!pageInfo.hasNextPage}
        onClick={() =>
          router.push(`/my?sort=LATEST&offset=${pageInfo.currentPage * 5}`, {
            scroll: false,
          })
        }
      >
        다음
      </ContainedButton>
    </div>
  );
}
