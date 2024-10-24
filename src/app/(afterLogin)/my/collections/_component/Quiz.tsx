"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GET_QUIZ_BRIEF,
  IBriefData as IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { useClientFetch } from "@/hooks/useClientFetch";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styles from "./quiz.module.scss";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  quizId: string;
};

export default function Quizzes({ quizId }: Props) {
  const params = useSearchParams();
  const collectionId = params.get("id");
  const { data, loading, error } = useClientFetch<IData>(
    GET_QUIZ_BRIEF,
    {
      variables: {
        collectionId,
      },
    },
    true
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  const targetQuiz = data?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  )?.quiz;

  if (!targetQuiz) return <p>등록된 퀴즈가 없습니다.</p>;

  return (
    <div key={targetQuiz.id} className={styles.quizWrapper}>
      <Dropdown onClose={handleOffDropdown}>
        <Dropdown.Active
          onClick={handleCloseDropdown}
          boxWidth={36}
          boxHeight={36}
        >
          <BsThreeDots className={styles.infoEditBtn} />
        </Dropdown.Active>
        <Dropdown.Menu isOpen={isOpen} containerWidth={100}>
          <Dropdown.Item>
            <Link
              href={`/my/editquiz?id=${targetQuiz.id}`}
              className={styles.dropdownItem}
            >
              수정
            </Link>
          </Dropdown.Item>
          <Dropdown.Item variant="alert">
            <Link href="/explore" className={styles.dropdownItem}>
              삭제
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className={styles.quizSection}>
        <span style={{ color: "blue" }}>ID: {targetQuiz.id}</span>
        <div className={styles.collectionAccess}>
          <div>{targetQuiz.access === "PRIVATE" ? "Private" : "Public"}</div>
        </div>
        <p>{targetQuiz.question}</p>
      </div>
      <div className={styles.quizSection}>
        <p>정답률 40%</p>
        <span>{`Updated ${dayjs(targetQuiz.updatedAt).fromNow()}`}</span>
      </div>
    </div>
  );
}
