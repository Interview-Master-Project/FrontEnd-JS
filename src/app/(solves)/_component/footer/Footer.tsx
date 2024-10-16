import Image from "next/image";
import Link from "next/link";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import Navigator from "./Navigator";
import Button from "@/app/_component/Button";
import styles from "./footer.module.scss";

type Props = {
  data: IData;
  quizId: string;
};

// params로 quizId 값을 얻음
// quizId에 해당하는 data를 render
// navigator를 클릭하면 params가 동적으로 바뀌면서 data를 다시 계산
export default function Footer({ data, quizId }: Props) {
  // 해당하는 퀴즈 정보 찾기
  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  );

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLeft}>
        <Image
          src={targetQuiz?.quiz.collection.imgUrl as string}
          alt="임시 이미지"
          width={45}
          height={45}
          style={{
            objectFit: "cover",
          }}
        />
        <span>{targetQuiz?.quiz.collection.name}</span>
        <span>{">"}</span>
        <span>{targetQuiz?.quiz.question}</span>
      </div>
      <div className={styles.footerCenter}>
        <Navigator data={data} quizId={quizId} />
      </div>
      <div className={styles.footerRight}>
        <span>{targetQuiz?.quiz.collection.access}</span>
        <span>{targetQuiz?.quiz.collection.category.name}</span>
        <Button contained={false} variant="red" className={styles.endBtn}>
          <Link href="/explore">종료</Link>
        </Button>
      </div>
    </div>
  );
}
