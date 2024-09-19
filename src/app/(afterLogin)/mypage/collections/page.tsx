"use client";

import { useSearchParams } from "next/navigation";
import Container from "@/app/(afterLogin)/_component/Container";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import type { StaticImageData } from "next/image";

export default function Page() {
  const [collDropdown, setCollDropdown] = useState(false);
  const [quizDropdown, setQuizDropdown] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleCollDropdown = () => {
    setCollDropdown((prevState) => !prevState);
  };

  type COLL = {
    imgUrl: string | StaticImageData;
    access: "PRIVATE" | "PUBLIC";
    title: string;
    quiz: QUIZ[];
  };

  type QUIZ = {
    id: number;
    title: string;
    rate?: number;
    createdAt: string;
    solvedAt?: string;
    category: CATEGORY;
  };

  type CATEGORY = {
    category: string;
    collection: string;
  };

  // dummy data
  const COLL_DATA: COLL = {
    imgUrl: logo,
    access: "PRIVATE",
    title: "Java 면접 질문 리스트",
    quiz: [
      {
        id: 1077,
        title: "String은 왜 불변 객체인가?",
        rate: 40,
        createdAt: "2024-09-16",
        solvedAt: "2024-09-16",
        category: { category: "IT/소프트웨어", collection: "Java" },
      },
      {
        id: 1076,
        title: "당신의 가장 소중한 것은 무엇입니까?",
        rate: 100,
        createdAt: "2024-09-10",
        solvedAt: "2024-09-17",
        category: { category: "인성", collection: "일반" },
      },
    ],
  };

  return (
    <>
      <Container>
        <div className={styles.infoWrapper}>
          <BsThreeDots
            className={styles.infoEditBtn}
            onClick={handleCollDropdown}
          />
          {collDropdown && (
            <div className={styles.collEditDropdown}>
              <Link href="/mypage/collections" className={styles.dropdownItem}>
                수정
              </Link>
              <Link
                href="/mypage/collections/delete"
                className={styles.dropdownItem}
              >
                삭제
              </Link>
            </div>
          )}
          <Image
            src={COLL_DATA.imgUrl}
            alt="임시 이미지"
            width={80}
            height={80}
          />
          <div>
            <div className={styles.collectionAccess}>
              <div>{COLL_DATA.access === "PRIVATE" ? "Private" : "Public"}</div>
            </div>
            <h4>{COLL_DATA.title}</h4>
          </div>
        </div>
      </Container>
      <div className={styles.listWrapper}>
        <Container title="질문 리스트">
          <Link href="/mypage/newquiz" className={styles.createNewBtn}>
            + 새 질문 추가
          </Link>
          {COLL_DATA.quiz.map((item: QUIZ, index: number) => {
            return (
              <div key={index} className={styles.quizWrapper}>
                <span style={{ color: "blue" }}>ID: {item.id}</span>
                <div>
                  {COLL_DATA.access === "PRIVATE" ? "Private" : "Public"}
                </div>
                <p>{item.title}</p>
                <span>{`${item.category.category} > ${item.category.collection}`}</span>
                <p>{item.rate && `정답률 ${item.rate}%`}</p>
                <span>{`Updated ${item.createdAt}`}</span>
              </div>
            );
          })}
        </Container>
      </div>
    </>
  );
}
