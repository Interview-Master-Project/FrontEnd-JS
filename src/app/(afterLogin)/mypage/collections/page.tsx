"use client";

import { useSearchParams } from "next/navigation";
import Container from "@/app/(afterLogin)/_component/Container";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export default function Page() {
  const [collDropdown, setCollDropdown] = useState(false);
  const [quizDropdown, setQuizDropdown] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log(`id : ${id}인 컬렉션 페이지`);

  const handleCollDropdown = () => {
    setCollDropdown((prevState) => !prevState);
  };

  return (
    <>
      <Container title="">
        <div className={styles.infoWrapper}>
          <BsThreeDots
            className={styles.infoEditBtn}
            onClick={handleCollDropdown}
          />
          {collDropdown && (
            <div className={styles.profileEditDropdown}>
              <div className={styles.dropdownItem}>수정</div>
              <div className={styles.dropdownItem}>삭제</div>
            </div>
          )}
          <Image src={logo} alt="임시 이미지" width={80} height={80} />
          <div>
            <div className={styles.collectionAccess}>
              <span>Public</span>
            </div>
            <h4>Java 면접 질문 리스트</h4>
          </div>
        </div>
      </Container>
      <div className={styles.listWrapper}>
        <Container title="질문 리스트">
          <Link href="/mypage/newquiz" className={styles.createNewBtn}>
            + 새 질문 추가
          </Link>
        </Container>
      </div>
    </>
  );
}
