"use client";

import { useRouter } from "next/navigation";
import { useClientMutation } from "@/hooks/useClientMutation";
import { DELETE_RECENT_ATTEMPT } from "@/graphql/mutation/delete-recent-attempt";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import InfoModal from "@/app/_component/InfoModal";
import { useClientFetch } from "@/hooks/useClientFetch";
import { GET_LATEST_QUIZZES_ATTEMPT } from "@/graphql/query/get-latest-quizzes-attempt";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";
import { GET_QUIZZES_ONLY_ID } from "@/graphql/query/get-quizzes-only-id";
import {
  GetLatestQuizzesAttemptQuery,
  GetQuizzesOnlyIdQuery,
  QuizResultInput,
} from "@/__api__/types";

type Props = {
  collId: string;
  userCollectionAttemptId: string;
};

export default function Guess({ collId, userCollectionAttemptId }: Props) {
  const router = useRouter();
  const { add, reset } = useLatestQuizzesAttemptStore();

  // 컴포넌트가 렌더링될 때 훅을 호출
  const { mutate: deleteRecent } = useClientMutation(
    DELETE_RECENT_ATTEMPT,
    {
      variables: { userCollectionAttemptId },
    },
    true
  );

  const { data: latestQuizzesAttemptData } =
    useClientFetch<GetLatestQuizzesAttemptQuery>(
      GET_LATEST_QUIZZES_ATTEMPT,
      { variables: { userCollectionAttemptId }, fetchPolicy: "no-cache" },
      true
    );

  const { data } = useClientFetch<GetQuizzesOnlyIdQuery>(
    GET_QUIZZES_ONLY_ID,
    {
      variables: { collectionId: collId },
    },
    true
  );

  const firstQuizId = data?.getQuizzesWithAttemptByCollectionId[0]?.quiz?.id;

  const handleClickContinue = async (selectContinue: boolean) => {
    if (!selectContinue) {
      await deleteRecent();
      reset();
      window.location.assign(`/collections/${collId}/quizzes/${firstQuizId}`);
    } else {
      latestQuizzesAttemptData?.getLatestQuizzesAttempt.forEach(
        ({ quiz, isCorrect, answeredAt }) => {
          add({
            quizId: quiz.id as string,
            correct: isCorrect,
            answeredAt,
          });
        }
      );
      router.push(`/collections/${collId}/quizzes/${firstQuizId}`);
    }
  };

  return (
    <InfoModal
      title="중단된 풀이 기록이 있습니다."
      subtitle="이어서 풀이하시겠습니까?"
      description="새로 시작하는 경우 중단 기록은 삭제됩니다."
      backButtonActive={false}
    >
      <OutlinedButton variant="gray" onClick={() => handleClickContinue(false)}>
        새로 시작
      </OutlinedButton>
      <ContainedButton onClick={() => handleClickContinue(true)}>
        이어서 풀기
      </ContainedButton>
    </InfoModal>
  );
}
