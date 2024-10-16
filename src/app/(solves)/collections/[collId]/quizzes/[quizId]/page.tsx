import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { fetchQueryData } from "@/utils/fetchQueryData";
import Footer from "@/app/(solves)/_component/footer/Footer";
import Sidebar from "@/app/(solves)/_component/sidebar/Sidebar";
import styles from "./page.module.scss";

type Props = {
  params: { collId: string; quizId: string };
};

export default async function Page({ params }: Props) {
  const { collId, quizId } = params;
  const { data, loading, error } = await fetchQueryData<IData>({
    query: GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    variables: {
      collectionId: collId,
    },
    requiresAuth: true,
  });

  // 해당하는 퀴즈 정보 찾기
  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => {
      quiz.id === quizId;
    }
  );

  return (
    <div className={styles.container}>
      <Sidebar data={data} />
      <div className={styles.solveWrapper}>
        <div className={styles.solveZone}>
          <h3>{targetQuiz?.quiz.question}</h3>
          <p>{targetQuiz?.quiz.answer}</p>
        </div>
      </div>
      <Footer data={data} />
    </div>
  );
}
