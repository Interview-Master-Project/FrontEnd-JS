import { redirect } from "next/navigation";
import {
  GET_QUIZZES_ONLY_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_LATEST_COLLECTION_ATTEMPT,
  IData as IAttemptCheckData,
} from "@/graphql/query/get-latest-collection-attempt";
import NoQuizzes from "./_component/NoQuizzes";

type TParams = {
  params: {
    collId: string;
  };
};

// 2-2-1. alert 오픈(새로하기, 이어하기)
// 2-2-1-1. 새로하기 선택함 => 뮤테 deleteRecent
// 2-2-1-2. 이어하기 선택함 => 쿼리 getLatestQuizzesAttempt

// 3. 풀이 페이지 redirect

export default async function Page({ params }: TParams) {
  const { collId } = params;

  // 1. 쿼리 getLatestCollectionAttempt (=> error, data 안에 completedAt === null)
  const { data: attemptCheckData } = await fetchQueryData<IAttemptCheckData>({
    query: GET_LATEST_COLLECTION_ATTEMPT,
    variables: {
      collectionId: collId,
    },
    requiresAuth: true,
  });

  // 2-1. completedAt === "날짜"
  if (attemptCheckData.getLatestCollectionAttempt.completedAt !== null) {
    // 2-1-1. 뮤테 startSolveCollection
    console.log("2-1-1. 뮤테 startSolveCollection");
  }

  // 2-2. data 안에 completedAt === null
  else {
    console.log("data 안에 completedAt === null");
  }

  return null;

  // const { data } = await fetchQueryData<IData>({
  //   query: GET_QUIZZES_ONLY_ID,
  //   variables: {
  //     collectionId: collId,
  //   },
  //   requiresAuth: true,
  // });

  // const initQuizId = data.getQuizzesWithAttemptByCollectionId[0]?.quiz.id;

  // if (initQuizId) {
  //   redirect(`/collections/${collId}/quizzes/${initQuizId}`);
  // } else {
  //   return <NoQuizzes collId={collId} />;
  // }
}
