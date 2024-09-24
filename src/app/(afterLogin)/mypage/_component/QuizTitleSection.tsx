"use client";

import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./quizTitleSection.module.scss";

export default function QuizTitleSection() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id")) ?? 1078;

  useEffect(() => {
    if (id === 1077 || id === 1076) {
      setEnteredTitle("id 1077 또는 1076의 컬렉션.");
    }
  }, []);

  const [enteredTitle, setEnteredTitle] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState<boolean | null>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(event.target.value);
    setEditTitle(true);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);

    if (enteredTitle!.trim().length < 3) {
      setIsValidTitle(false);
    } else {
      setIsValidTitle(true);
    }
  };

  return (
    <div className={styles.titleSection}>
      <div>
        <input
          id="title"
          name="title"
          type="search"
          className={styles.titleInput}
          value={enteredTitle ?? ""}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          placeholder="질문 제목을 적어주세요"
        />
        {!editTitle &&
          enteredTitle !== null &&
          (!isValidTitle ? (
            <p style={{ color: "red" }}>3글자 이상 입력하세요.</p>
          ) : (
            <p style={{ color: "green" }}>사용 가능한 질문 제목입니다.</p>
          ))}
      </div>
    </div>
  );
}
