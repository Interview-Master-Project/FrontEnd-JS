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
              <Dropdown.Item>
                <Link
                  href={`/my/collections/${collId}/quizzes/${targetQuiz?.quiz?.id}/edit`}
                >
                  수정
                </Link>
              </Dropdown.Item>
              <Dropdown.Item variant="alert">
                <Link
                  href={`/my/collections/${collId}/quizzes/${targetQuiz?.quiz?.id}/delete`}
                >
                  삭제
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </>
  );
}
