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

  // totalPages 만큼 배열 크기와 1, 2, 3,... 생성
  const pageArr: number[] = Array(totalPages)
    .fill(1)
    .map((value, idx) => value + idx);

  const router = useRouter();
  const handleOffset = (newOffset: number) => {
    changeOffset(newOffset);
    router.push(`/explore?sort=${sort}&offset=${newOffset}`);
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
