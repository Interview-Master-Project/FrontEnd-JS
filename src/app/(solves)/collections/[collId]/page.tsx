import { redirect } from "next/navigation";
import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_QUIZZES_ONLY_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import NoQuizzes from "./_component/NoQuizzes";
import {
  GET_LATEST_COLLECTION_ATTEMPT,
  IData as IAttemptData,
} from "@/graphql/query/get-latest-collection-attempt";

type TParams = {
  params: {
    collId: string;
  };
};

export default async function Page({ params }: TParams) {
  const { collId } = params;

  const { data } = await fetchQueryData<IData>({
    query: GET_QUIZZES_ONLY_ID,
    variables: {
      collectionId: collId,
    },
    requiresAuth: true,
  });
  const initQuizId = data.getQuizzesWithAttemptByCollectionId[0]?.quiz.id;

  // 1번 문제로 redirect하는 함수
  const redirection = () => {
    if (initQuizId) {
      redirect(`/collections/${collId}/quizzes/${initQuizId}`);
    } else {
      return <NoQuizzes collId={collId} />;
    }
  };

  // 기록 유무 확인
  try {
    const { data: attemptData } = await fetchQueryData<IAttemptData>({
      query: GET_LATEST_COLLECTION_ATTEMPT,
      variables: {
        collectionId: collId,
      },
      requiresAuth: true,
    });

    // 풀이 기록이 있음
    console.log(attemptData.getLatestCollectionAttempt.completedAt);

    if (attemptData.getLatestCollectionAttempt.completedAt) {
      console.log("중단기록 없음");
      // startSolveCollection 함수 실행
      // redirection
    } else {
      console.log("중단기록 있음");
      // 모달 띄우기
      // 선택 여부에 따라 조건부 함수 실행
    }

    return null;

    // 1. 중단한 적 있음

    // 2. 중단한 적 없음
  } catch (err) {
    // 풀이 기록 전무
    redirection();
  }
}
