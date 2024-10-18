"use client";

import Container from "../../_component/Container";
import QuizTitleSection from "../_component/QuizTitleSection";
import Link from "next/link";
import styles from "./page.module.scss";
import QuizDescription from "../_component/QuizDescription";

export default function Page() {
  return (
    <form className={styles.form}>
      <Container title="질문 제목">
        <QuizTitleSection />
      </Container>
      <Container title="답변 보기 설명">
        <QuizDescription />
      </Container>
      <Container title="질문 추가">
        <div className={styles.cancelSaveSection}>
          <Link href="/my/newquiz/cancel">취소</Link>
          <Link href="/my/newquiz/save">저장 및 추가</Link>
        </div>
      </Container>
    </form>
  );
}
