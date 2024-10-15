import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import Footer from "@/app/(solves)/_component/footer/Footer";
import Sidebar from "@/app/(solves)/_component/sidebar/Sidebar";
import styles from "./layout.module.scss";

type TParams = {
  params: { collId: string; quizId: string };
};

export default async function Layout({
  children,
  params,
}: React.PropsWithChildren & TParams) {
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
      {children}
      <Footer data={data} />
    </div>
  );
}
