"use client";

import styles from "./page.module.scss";
import Container from "../../_component/Container";
import Link from "next/link";
import SelectCategories from "../../_component/SelectCategories";
import CollImgTitle from "../_component/CollImgTitle";
import CollDescription from "../_component/CollDescription";
import CollAccess from "../_component/CollAccess";

export default function Page() {
  return (
    <form className={styles.form}>
      <Container title="컬렉션 제목">
        <CollImgTitle id={2} />
      </Container>
      <Container title="상세 설명">
        <CollDescription id={2} />
      </Container>
      <Container title="공개 범위 여부">
        <CollAccess id={2} />
      </Container>
      <SelectCategories titleOp />
      <Container title="컬렉션 추가">
        <div className={styles.cancelSaveSection}>
          <Link href="/mypage/newcoll/cancel">취소</Link>
          <Link href="/mypage/newcoll/save">저장 및 추가</Link>
        </div>
      </Container>
    </form>
  );
}
