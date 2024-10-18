"use client";

import { useSearchParams } from "next/navigation";
import Container from "../../_component/Container";
import CollImgTitle from "../_component/CollImgTitle";
import CollDescription from "../_component/CollDescription";
import CollAccess from "../_component/CollAccess";
import SelectCategories from "../../_component/SelectCategories";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Page() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  // id는 1~5 사이의 값이 될 것

  return (
    <form className={styles.form}>
      <Container title="컬렉션 제목">
        <CollImgTitle id={id} />
      </Container>
      <Container title="상세 설명">
        <CollDescription id={id} />
      </Container>
      <Container title="공개 범위 여부">
        <CollAccess id={id} />
      </Container>
      <SelectCategories titleOp />
      <Container title="컬렉션 추가">
        <div className={styles.cancelSaveSection}>
          <Link href="/my/newcoll/cancel">취소</Link>
          <Link href="/my/newcoll/save">저장 및 추가</Link>
        </div>
      </Container>
    </form>
  );
}
