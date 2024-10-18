import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { fetchQueryData } from "@/utils/fetchQueryData";
import Footer from "@/app/(solves)/_component/footer/Footer";
import SolveZone from "@/app/(solves)/_component/SolveZone";
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

  return (
    <div className={styles.container}>
      <Sidebar data={data} />
      <div className={styles.solveWrapper}>
        <SolveZone data={data} />
      </div>
      <Footer data={data} quizId={quizId} />
    </div>
  );
}
