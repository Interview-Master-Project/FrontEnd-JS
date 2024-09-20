"use client";

import styles from "./page.module.scss";
import Container from "@/app/(afterLogin)/_component/Container";
import TextAreaAutoSize from "react-textarea-autosize";
import Link from "next/link";
import { useState } from "react";
import { ChangeEvent } from "react";

export default function Page() {
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
    <form className={styles.form}>
      <Container title="질문 제목">
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
      </Container>
      <Container title="답변 보기 설명">
        <TextAreaAutoSize
          id="description"
          name="description"
          className={styles.description}
          placeholder="질문에 대한 답변을 적어주세요."
        ></TextAreaAutoSize>
      </Container>
      <Container title="질문 추가">
        <div className={styles.cancelSaveSection}>
          <Link href="/mypage/newquiz/cancel">취소</Link>
          <Link href="/mypage/newquiz/save">저장 및 추가</Link>
        </div>
      </Container>
    </form>
  );
}
