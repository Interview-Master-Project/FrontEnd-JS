"use client";

import { useRouter } from "next/navigation";
import { useClientMutation } from "@/hooks/useClientMutation";
import { DELETE_RECENT_ATTEMPT } from "@/graphql/mutation/delete-recent-attempt";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import InfoModal from "@/app/_component/InfoModal";
import { GET_LATEST_COLLECTION_ATTEMPT } from "@/graphql/query/get-latest-collection-attempt";
import { useCookies } from "next-client-cookies";
import { useClientFetch } from "@/hooks/useClientFetch";
import {
  GET_LATEST_QUIZZES_ATTEMPT,
  IData,
} from "@/graphql/query/get-latest-quizzes-attempt";
import { useLatestQuizzesAttemptStore } from "@/store/useLatestQuizzesAttemptStore";

type Props = {
  collId: string;
  userCollectionAttemptId: string;
};

export default function Guess({ collId, userCollectionAttemptId }: Props) {
  const cookies = useCookies();
  const token = cookies.get("authToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const router = useRouter();
  const { setQuizzes } = useLatestQuizzesAttemptStore();

  // 컴포넌트가 렌더링될 때 훅을 호출
  const { mutate: deleteRecent } = useClientMutation(
    DELETE_RECENT_ATTEMPT,
    {
      variables: { userCollectionAttemptId },
      refetchQueries: [
        {
          query: GET_LATEST_COLLECTION_ATTEMPT,
          variables: { collectionId: collId },
          context: { headers },
        },
      ],
      awaitRefetchQueries: true,
    },
    true
  );

  const { data: latestQuizzesAttemptData } = useClientFetch<IData>(
    GET_LATEST_QUIZZES_ATTEMPT,
    { variables: { userCollectionAttemptId } },
    true
  );

  const handleClickContinue = async (selectContinue: boolean) => {
    if (!selectContinue) {
      await deleteRecent();
      router.refresh();
    } else {
      setQuizzes(latestQuizzesAttemptData?.getLatestQuizzesAttempt ?? []);
      await deleteRecent();
      router.refresh();
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
