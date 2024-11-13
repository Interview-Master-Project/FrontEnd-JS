import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import Info from "./Info";
import styles from "./header.module.scss";

type Props = {
  data: IData;
  collId: string;
  quizId: string;
};

export default function Header({ data, collId, quizId }: Props) {
  const targetQuiz = data.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  )?.quiz;

  const quizLen = data.getQuizzesWithAttemptByCollectionId.length;
  const currQuizIdx = data.getQuizzesWithAttemptByCollectionId.findIndex(
    ({ quiz }) => quiz.id === quizId
  ); // 현재 퀴즈 인덱스

  return (
    <header className={styles.headerContainer}>
      <Info targetQuiz={targetQuiz} />
      <div className={styles.progressContainer}>
        <progress
          id="progress"
          value={currQuizIdx.toString()}
          max={quizLen.toString()}
        ></progress>
      </div>
    </header>
  );
}
