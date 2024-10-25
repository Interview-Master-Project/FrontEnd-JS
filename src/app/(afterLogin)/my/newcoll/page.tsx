"use client";

import Container from "../../_component/Container";
import Link from "next/link";
import SelectCategories from "../../_component/SelectCategories";
import CollImgTitle from "../_component/CollImgTitle";
import CollDescription from "../_component/CollDescription";
import CollAccess from "../_component/CollAccess";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./page.module.scss";

// 여기서 공통 컴포넌트화 => editcoll에도 활용할 수 있게
// 자식 컴포넌트 내에서 params를 읽어서 존재하면 수정, 그렇지 않으면 생성

export default function Page() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // mutation
    } catch (err) {
      console.error("생성 과정 오류입니다.", err);
    }
  };

  return (
    <form className={styles.form}>
      <Container title="컬렉션 제목">
        <CollImgTitle />
      </Container>
      <Container title="상세 설명">
        <CollDescription id={6} />
      </Container>
      <Container title="공개 범위 여부">
        <CollAccess id={6} />
      </Container>
      <SelectCategories titleOp />
      <div className={styles.cancelSaveSection}>
        <ContainedButton>저장 및 추가</ContainedButton>
        <Link href="/my">
          <OutlinedButton variant="red">취소</OutlinedButton>
        </Link>
      </div>
    </form>
  );
}
