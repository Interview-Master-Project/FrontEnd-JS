import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  GET_QUIZ_HEADER,
  IHeaderData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { IoMenu } from "react-icons/io5";
import { MdChevronRight as RightIcon } from "react-icons/md";
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
      <div className={styles.infoContainer}>
        <section>
          <IoMenu className={styles.menuIcon} />
          <h3>{targetQuiz?.collection.name}</h3>
          <RightIcon className={styles.rightIcon} />
          <h3>{targetQuiz?.question}</h3>
          <h5>{targetQuiz?.collection.category.name}</h5>
        </section>
      </div>
      <div className={styles.progressContainer}>
        <progress value="20" max="100"></progress>
      </div>
    </header>
  );
}
