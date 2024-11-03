"use client";

import {
  FaChevronLeft as PrevIcon,
  FaChevronRight as NextIcon,
} from "react-icons/fa";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import styles from "./navigator.module.scss";

type Props = {
  currentPage: number | undefined;
  hasNextPage: boolean | undefined;
  totalPages: number | undefined;
};

export default function Navigator({
  currentPage = 1,
  hasNextPage = false,
  totalPages = 1,
}: Props) {
  const { sort, changeOffset } = useSortOffsetStore();

  const pageArr: number[] = (() => {
    if (totalPages <= 10) {
      // 총 페이지 수가 10 이하인 경우, 전체 페이지를 표시
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    if (currentPage <= 5) {
      // currentPage가 1~5에 있을 경우, 1부터 10까지 표시
      return Array.from({ length: 10 }, (_, idx) => idx + 1);
    }

    if (totalPages - currentPage < 5) {
      // currentPage가 끝에서 4 이하일 경우, (totalPages - 9)부터 totalPages까지 표시
      return Array.from({ length: 10 }, (_, idx) => totalPages - 9 + idx);
    }

    // 그 외의 경우, currentPage를 중심으로 앞뒤로 5개씩 표시
    return Array.from({ length: 10 }, (_, idx) => currentPage - 5 + idx);
  })();

  const router = useRouter();
  const handleOffset = (newOffset: number) => {
    changeOffset(newOffset);

    const currentPath = window.location.pathname;
    router.push(`${currentPath}?sort=${sort}&offset=${newOffset}`);
  };

  return (
    <div className={styles.navigator}>
      <button
        disabled={currentPage === 1}
        className={styles.navigateBtn}
        onClick={() => handleOffset((currentPage - 2) * 8)}
      >
        <PrevIcon />
      </button>
      {pageArr.map((pageIdx) => (
        <div
          key={pageIdx}
          onClick={() => handleOffset((pageIdx - 1) * 8)}
          className={clsx({
            [styles.currentPage]: currentPage === pageIdx,
          })}
        >
          {pageIdx}
        </div>
      ))}
      <button
        disabled={!hasNextPage}
        className={styles.navigateBtn}
        onClick={() => handleOffset(currentPage * 8)}
      >
        <NextIcon />
      </button>
    </div>
  );
}
