"use client";

import { useState } from "react";
import Link from "next/link";
import { TargetQuizProps } from "@/types/CollectionDetails/TargetQuizProps";
import { Dropdown } from "../dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import styles from "./quiz.module.scss";

export default function QuizInfoEditBtn({
  isCreator,
  collId,
  quizElement: targetQuiz,
}: Omit<TargetQuizProps, "quizIdx">) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isCreator && (
        <div className={styles.dropdown}>
          <Dropdown onClose={handleOffDropdown}>
            <Dropdown.Active
              onClick={handleCloseDropdown}
              boxWidth={36}
              boxHeight={36}
            >
              <BsThreeDots />
            </Dropdown.Active>
            <Dropdown.Menu isOpen={isOpen} containerWidth={100}>
              <Link
                href={`/my/collections/${collId}/quizzes/${targetQuiz?.quiz?.id}/edit`}
              >
                <Dropdown.Item>수정</Dropdown.Item>
              </Link>
              <Link
                href={`/my/collections/${collId}/quizzes/${targetQuiz?.quiz?.id}/delete`}
              >
                <Dropdown.Item variant="alert">삭제</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </>
  );
}
