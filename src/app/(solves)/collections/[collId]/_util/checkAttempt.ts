import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_LATEST_COLLECTION_ATTEMPT,
  IData as IAttemptData,
} from "@/graphql/query/get-latest-collection-attempt";

async function checkAttempt(collId: string) {
  // 기록 유무 확인
  try {
    const { data: attemptData } = await fetchQueryData<IAttemptData>({
      query: GET_LATEST_COLLECTION_ATTEMPT,
      variables: {
        collectionId: collId,
      },
      requiresAuth: true,
    });

    // string인 경우 => 완료됨 => 1번 퀴즈로 가 => true
    // null인 경우 => 중단됨 => 모달 띄워 => false
    return {
      userCollectionAttemptId: attemptData.getLatestCollectionAttempt.id,
      completed: attemptData.getLatestCollectionAttempt.completedAt !== null,
    };
  } catch (err) {
    // 풀이 기록 전무 => 1번 퀴즈로 가 => true
    return { completed: true };
  }
}

export default checkAttempt;
