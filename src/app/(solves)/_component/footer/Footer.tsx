import Image from "next/image";
import Link from "next/link";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import Navigator from "./Navigator";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./footer.module.scss";

type Props = {
  data: IData;
  quizId: string;
};

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
        <OutlinedButton variant="red">
          <Link href="/explore">종료</Link>
        </OutlinedButton>
      </div>
    </div>
  );
}
