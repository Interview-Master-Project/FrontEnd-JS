"use client";

import IData, { IPageInfo } from "@/model/search-collections";
import clsx from "clsx";
import styles from "./paging.module.scss";
import { useQuery } from "@apollo/client";
import { SEARCH_COLLECTIONS } from "@/graphql/query";

// 총 페이지, 현재 페이지 정보를 가져오고
// click 시마다 다른 variables로 재요청

interface Props {
  pageInfo: IPageInfo | undefined;
  onChangeSkip: () => void;
}

export default function Paging({ pageInfo, onChangeSkip }: Props) {
  return (
    <div className={styles.pagingWrapper}>
      <button>이전</button>
      {/* {pageArr?.map((value, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(value)}
          className={clsx({
            [styles.currentPage]: currentPage === value,
          })}
        >
          {value}
        </button>
      ))} */}
      <button>다음</button>
    </div>
  );
}
