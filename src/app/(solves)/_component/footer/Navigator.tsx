"use client";

import { useRouter, usePathname } from "next/navigation";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";

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

  const handleClick = () => {
    // 다음 퀴즈 인덱스에 해당하는 퀴즈의 id 추출
    const nextQuizId =
      data.getQuizzesWithAttemptByCollectionId[currQuizIdx + 1].quiz.id;
    // 추출한 id를 새 path로 지정
    const newPath = pathname.replace(/\/(\d+)$/, `/${nextQuizId}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={handleClick}
      disabled={
        data.getQuizzesWithAttemptByCollectionId.length - 1 === currQuizIdx
      }
    >
      다음
    </button>
  );
}
