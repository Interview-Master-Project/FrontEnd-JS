"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./navigator.module.scss";

type Props = {
  data: IData;
  collId: string;
  quizId: string;
};

export default function Navigator({ data, collId, quizId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const quizLen = data.getQuizzesWithAttemptByCollectionId.length; // 퀴즈 개수
  const currQuizIdx = data.getQuizzesWithAttemptByCollectionId.findIndex(
    ({ quiz }) => quiz.id === quizId
  ); // 현재 퀴즈 인덱스

  const handleClick = (moveIdx: number) => {
    // 다음 퀴즈 인덱스에 해당하는 퀴즈의 id 추출
    const navigateQuizId =
      data.getQuizzesWithAttemptByCollectionId[currQuizIdx + moveIdx].quiz.id;
    // 추출한 id를 새 path로 지정
    const newPath = pathname.replace(/\/(\d+)$/, `/${navigateQuizId}`);
    router.push(newPath);
  };

  return (
    <nav className={styles.navigatorWrapper}>
      <div style={{ visibility: "hidden" }}></div>
      <div className={styles.navigation}>
        <OutlinedButton
          variant="gray"
          onClick={() => handleClick(-1)}
          disabled={currQuizIdx === 0}
        >
          이전
        </OutlinedButton>
        <strong>{`${currQuizIdx + 1} / ${quizLen}`}</strong>
        <ContainedButton
          onClick={() => handleClick(1)}
          disabled={currQuizIdx === quizLen - 1}
        >
          다음
        </ContainedButton>
      </div>
      <div className={styles.decision}>
        <OutlinedButton variant="red">
          <Link href={`/details/collections/${collId}`}>나가기</Link>
        </OutlinedButton>
      </div>
    </nav>
  );
}
