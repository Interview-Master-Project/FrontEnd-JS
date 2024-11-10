import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_QUIZ_HEADER,
  IHeaderData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import Info from "./Info";
import styles from "./header.module.scss";

type Props = {
  collId: string;
  quizId: string;
};

export default async function Header({ collId: collectionId, quizId }: Props) {
  const { data } = await fetchQueryData<IHeaderData>({
    query: GET_QUIZ_HEADER,
    variables: {
      collectionId,
    },
    requiresAuth: true,
  });

  const targetQuiz = data.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  )?.quiz;

  return (
    <header className={styles.headerContainer}>
      <Info targetQuiz={targetQuiz} />
      <div className={styles.progressContainer}>
        <progress value="20" max="100"></progress>
      </div>
    </header>
  );
}
