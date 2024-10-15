"use client";

import { IPageInfo } from "@/model/search-collections";
import clsx from "clsx";
import styles from "./paging.module.scss";

interface Props {
  pageInfo: IPageInfo | undefined;
  onChangeSkip: (page: number) => void;
}

export default function Paging({ pageInfo, onChangeSkip }: Props) {
  const { currentPage, hasNextPage, totalPages } = pageInfo as IPageInfo;

  // totalPages 만큼 배열 크기와 1, 2, 3,... 생성
  const pageArr = Array(totalPages)
    .fill(1)
    .map((value, idx) => value + idx);

  return (
    <div className={styles.pagingWrapper}>
      <button
        disabled={currentPage === 1}
        onClick={() => onChangeSkip(currentPage - 1)}
      >
        이전
      </button>
      {pageArr?.map((pageIdx, idx) => (
        <button
          key={idx}
          onClick={() => onChangeSkip(pageIdx)}
          className={clsx({
            [styles.currentPage]: currentPage === pageIdx,
          })}
        >
          {pageIdx}
        </button>
      ))}
      <button
        disabled={!hasNextPage}
        onClick={() => onChangeSkip(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
}
