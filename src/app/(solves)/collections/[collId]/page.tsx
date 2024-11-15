import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_QUIZZES_ONLY_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import checkAttempt from "./_util/checkAttempt";
import { quizRedirect } from "./_util/quizRedirect";
import NoQuizzes from "./_component/NoQuizzes";
import Guess from "./_component/Guess";

export type TParams = {
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
  const firstQuizId = data.getQuizzesWithAttemptByCollectionId[0]?.quiz.id;

  // 컬렉션 풀이 시도 여부 검사
  const { userCollectionAttemptId, completed } = await checkAttempt(collId);

  if (completed) {
    const { noQuizzes } = await quizRedirect(collId, firstQuizId);
    if (!noQuizzes) return null;
    if (noQuizzes) return <NoQuizzes collId={collId} />;
  }

  return (
    <Guess
      collId={collId}
      userCollectionAttemptId={userCollectionAttemptId as string}
    />
  );
}
