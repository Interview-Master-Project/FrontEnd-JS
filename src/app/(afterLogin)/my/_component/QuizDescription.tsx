"use client";

import TextAreaAutoSize from "react-textarea-autosize";
import styles from "./quizDescription.module.scss";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function QuizDescription() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id")) ?? 7777;

  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (id === 1077 || id === 1076) {
      setDescription("id 1077 또는 1076의 상세 설명입니다.");
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <TextAreaAutoSize
      id="description"
      name="description"
      className={styles.description}
      value={description ?? ""}
      onChange={handleChange}
      placeholder="질문에 대한 답변을 적어주세요."
    ></TextAreaAutoSize>
  );
}
