import Link from "next/link";
import { IDetailsProps } from "@/types/CollectionDetails/types";
import ContainedButton from "../button/ContainedButton";
import styles from "./quizDetails.module.scss";

export default function CreateNewQuiz({ isCreator, collId }: IDetailsProps) {
  return (
    <>
      {isCreator && (
        <Link
          href={`/my/collections/${collId}/newquiz`}
          className={styles.createNewBtn}
        >
          <ContainedButton variant="base">+ 새 질문 추가</ContainedButton>
        </Link>
      )}
    </>
  );
}
