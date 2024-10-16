import { redirect } from "next/navigation";
import {
  GET_QUIZZES_ONLY_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { fetchQueryData } from "@/utils/fetchQueryData";

type TParams = {
  params: {
    collId: string;
  };
};

export default async function Page({ params }: TParams) {
  const { collId } = params;

  const { data, error, loading } = await fetchQueryData<IData>({
    query: GET_QUIZZES_ONLY_ID,
    variables: {
      collectionId: collId,
    },
    requiresAuth: true,
  });

  if (loading) return <span>잠시 기다려주세요...</span>;

  if (error) {
    console.error("Error: ", error.message);
    return <span>컬렉션 정보를 불러오는 데 실패했습니다.</span>;
  }

  const initQuizId = data.getQuizzesWithAttemptByCollectionId[0].quiz.id;

  if (initQuizId) {
    redirect(`/collections/${collId}/quizzes/${initQuizId}`);
  } else {
    return <p>등록된 퀴즈가 없습니다.</p>;
  }
}
