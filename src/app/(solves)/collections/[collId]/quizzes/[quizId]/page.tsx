import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import {
  GET_LATEST_COLLECTION_ATTEMPT,
  IData as IAttemptData,
} from "@/graphql/query/get-latest-collection-attempt";
import Sidebar from "@/app/(solves)/_component/sidebar/Sidebar";
import ContentSection from "@/app/(solves)/_component/contentSection/ContentSection";
import Header from "@/app/(solves)/_component/header/Header";
import Navigator from "@/app/(solves)/_component/navigator/Navigator";
import SolveZone from "@/app/(solves)/_component/SolveZone";
import styles from "./page.module.scss";

type Props = {
  params: { collId: string; quizId: string };
};

export default async function Page({ params }: Props) {
  const { collId, quizId } = params;

  const { data } = await fetchQueryData<IData>({
    query: GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    variables: {
      collectionId: collId,
    },
    requiresAuth: true,
  });

  const { data: attemptData } = await fetchQueryData<IAttemptData>({
    query: GET_LATEST_COLLECTION_ATTEMPT,
    variables: {
      collectionId: collId,
    },
    requiresAuth: true,
  });

  const userCollectionAttemptId = attemptData.getLatestCollectionAttempt.id;

  return (
    <div className={styles.container}>
      <Sidebar data={data} />
      <ContentSection>
        <Header data={data} collId={collId} quizId={quizId} />
        <SolveZone
          collId={collId}
          quizId={quizId}
          userCollectionAttemptId={userCollectionAttemptId}
        />
        <Navigator
          data={data}
          collId={collId}
          quizId={quizId}
          userCollectionAttemptId={userCollectionAttemptId}
        />
      </ContentSection>
    </div>
  );
}
