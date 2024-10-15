import { apollo } from "@/graphql/apolloClient";
import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { cookies } from "next/headers";
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
  const { data } = await fetchSolveData(collId);

  return (
    <div className={styles.container}>
      <Sidebar data={data} />
      {children}
      <Footer data={data} />
    </div>
  );
}

async function fetchSolveData(params: any) {
  const token = cookies().get("authToken")?.value;

  const { data }: { data: IData } = await apollo.query({
    query: GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    variables: {
      collectionId: params,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return { data };
}
