import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_component/Button";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import styles from "./footer.module.scss";

export default function Footer({ data }: { data: IData }) {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLeft}>
        <Image
          src={
            data?.getQuizzesWithAttemptByCollectionId[0].quiz
              .collection.imgUrl as string
          }
          alt="임시 이미지"
          width={45}
          height={45}
          style={{
            objectFit: "cover",
          }}
        />
        <span>
          {
            data?.getQuizzesWithAttemptByCollectionId[0].quiz
              .collection.name
          }
        </span>
        <span>{">"}</span>
        <span>
          {data?.getQuizzesWithAttemptByCollectionId[0].quiz.question}
        </span>
      </div>
      <div className={styles.footerCenter}>
        {/* <button
          onClick={() => setProblemIdx(problemIdx + 1)}
          disabled={
            data?.getQuizzesWithAttemptByCollectionId.length! - 1 === problemIdx
          }
        >
          다음
        </button> */}
      </div>
      <div className={styles.footerRight}>
        <span>
          {data?.getQuizzesWithAttemptByCollectionId[0].quiz.collection.access}
        </span>
        <span>
          {
            data?.getQuizzesWithAttemptByCollectionId[0].quiz
              .collection.category.name
          }
        </span>
        <Button contained={false} variant="red" className={styles.endBtn}>
          <Link href="/home">종료</Link>
        </Button>
      </div>
    </div>
  );
}
