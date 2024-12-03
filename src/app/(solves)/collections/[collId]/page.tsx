import { fetchQueryData } from "@/utils/fetchQueryData";
import { GET_QUIZZES_ONLY_ID } from "@/graphql/query/get-quizzes-only-id";
import { GetQuizzesOnlyIdQuery } from "@/__api__/types";
import checkAttempt from "./_util/checkAttempt";
import { quizRedirect } from "./_util/quizRedirect";
import NoQuizzes from "./_component/NoQuizzes";
import Guess from "./_component/Guess";

type Props = {
  params: {
    collId: string;
  };
};

export default async function Page({ params }: Props) {
  const { collId: collectionId } = params;

  // 컬렉션의 id 리스트 조회
  const { data } = await fetchQueryData<GetQuizzesOnlyIdQuery>({
    query: GET_QUIZZES_ONLY_ID,
    variables: {
      collectionId,
    },
    requiresAuth: true,
  });
  const firstQuizId = data.getQuizzesWithAttemptByCollectionId[0].quiz?.id;

  // 컬렉션 풀이 시도 여부 검사
  const { userCollectionAttemptId, completed } = await checkAttempt(
    collectionId
  );

  if (completed) {
    const { noQuizzes } = await quizRedirect(collectionId, firstQuizId!);
    if (!noQuizzes) return null;
    if (noQuizzes) return <NoQuizzes collId={collectionId} />;
  }

  return (
    <Guess
      collId={collectionId}
      userCollectionAttemptId={userCollectionAttemptId as string}
    />
  );
}
