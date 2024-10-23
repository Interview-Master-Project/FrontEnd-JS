"use client";

import { useRouter, usePathname } from "next/navigation";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import {
  FaChevronLeft as PrevIcon,
  FaChevronRight as NextIcon,
} from "react-icons/fa";
import styles from "./navigator.module.scss";

type Props = {
  data: IData;
  quizId: string;
};

export default function Navigator({ data, quizId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 퀴즈의 인덱스
  const currQuizIdx = data.getQuizzesWithAttemptByCollectionId.findIndex(
    ({ quiz }) => quiz.id === quizId
  );

  const handleClick = (navigate: number) => {
    // 다음 퀴즈 인덱스에 해당하는 퀴즈의 id 추출
    const navigateQuizId =
      data.getQuizzesWithAttemptByCollectionId[currQuizIdx + navigate].quiz.id;
    // 추출한 id를 새 path로 지정
    const newPath = pathname.replace(/\/(\d+)$/, `/${navigateQuizId}`);
    router.push(newPath);
  };

  return (
    <div className={styles.navigator}>
      <button onClick={() => handleClick(-1)} disabled={currQuizIdx === 0}>
        <PrevIcon />
      </button>
      <button
        onClick={() => handleClick(1)}
        disabled={
          data.getQuizzesWithAttemptByCollectionId.length - 1 === currQuizIdx
        }
      >
        <NextIcon />
      </button>
    </div>
  );
}
