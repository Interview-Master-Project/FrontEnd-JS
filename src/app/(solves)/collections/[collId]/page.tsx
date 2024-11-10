import { redirect } from "next/navigation";
import Link from "next/link";
import {
  GET_QUIZZES_ONLY_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { fetchQueryData } from "@/utils/fetchQueryData";
import ContainedButton from "@/app/_component/button/ContainedButton";

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

  const initQuizId = data.getQuizzesWithAttemptByCollectionId[0]?.quiz.id;

  if (initQuizId) {
    redirect(`/collections/${collId}/quizzes/${initQuizId}`);
  } else {
    return (
      <div
        style={{
          width: "100dvw",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        <h1>등록된 퀴즈가 없습니다.</h1>
        <ContainedButton>
          <Link href={`/details/collections/${collId}`}>퀴즈 추가</Link>
        </ContainedButton>
      </div>
    );
  }
}
