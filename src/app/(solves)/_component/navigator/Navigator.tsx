"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";
import { useClientMutation } from "@/hooks/useClientMutation";
import { FINISH_SOLVE_COLLECTION } from "@/graphql/mutation/finish-solve-collection";
import { DELETE_RECENT_ATTEMPT } from "@/graphql/mutation/delete-recent-attempt";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./navigator.module.scss";

type Props = {
  data: GetQuizzesWithAttemptByCollectionIdQuery;
  collId: string;
  quizId: string;
  userCollectionAttemptId: string;
};

export default function Navigator({
  data,
  collId,
  quizId,
  userCollectionAttemptId,
}: Props) {
  const { quizzes } = useLatestQuizzesAttemptStore();
  const router = useRouter();
  const pathname = usePathname();

  const quizLen = data.getQuizzesWithAttemptByCollectionId.length; // 퀴즈 개수
  const currQuizIdx = data.getQuizzesWithAttemptByCollectionId.findIndex(
    ({ quiz }) => quiz?.id === quizId
  ); // 현재 퀴즈 인덱스

  const handleClick = (moveIdx: number) => {
    // 다음 퀴즈 인덱스에 해당하는 퀴즈의 id 추출
    const navigateQuizId =
      data?.getQuizzesWithAttemptByCollectionId[currQuizIdx + moveIdx]?.quiz
        ?.id;
    // 추출한 id를 새 path로 지정
    const newPath = pathname.replace(/\/(\d+)$/, `/${navigateQuizId}`);
    router.push(newPath);
  };

  const { mutate: finishMutate } = useClientMutation(
    FINISH_SOLVE_COLLECTION,
    {
      variables: {
        userCollectionAttemptId,
      },
    },
    true
  );

  // 문제를 모두 풀고 제출 버튼을 눌렀을 때
  const handleSubmit = async () => {
    try {
      await finishMutate();
      alert("모든 풀이 결과를 제출 완료했어요!");
      window.location.assign(`/details/collections/${collId}`);
    } catch (err) {
      console.error("풀이 결과 제출에 오류가 발생했습니다.");
    }
  };

  const { mutate: deleteMutate } = useClientMutation(
    DELETE_RECENT_ATTEMPT,
    {
      variables: {
        userCollectionAttemptId,
      },
    },
    true
  );

  const handleGetOut = async () => {
    const result = confirm("지금까지의 결과를 임시 저장할까요?");
    if (result) {
      // 저장
      window.location.assign(`/details/collections/${collId}`);
    } else {
      // 저장 안함
      await deleteMutate();
      window.location.assign(`/details/collections/${collId}`);
    }
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
        {quizzes.length === quizLen && (
          <ContainedButton variant="base" onClick={handleSubmit}>
            제출
          </ContainedButton>
        )}
        {quizzes.length !== quizLen && (
          <OutlinedButton variant="red" onClick={handleGetOut}>
            나가기
          </OutlinedButton>
        )}
      </div>
    </nav>
  );
}
