"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  GET_COLLECTION,
  IData,
  IQuizzes,
} from "@/graphql/query/get-collection";
import { useClientFetch } from "@/hooks/useClientFetch";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import Container from "@/app/(afterLogin)/_component/Container";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import ContainedButton from "@/app/_component/button/ContainedButton";
import Quiz from "./_component/Quiz";
import styles from "./page.module.scss";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();
  const collectionId = params.get("id");

  const { data, loading, error } = useClientFetch<IData>(
    GET_COLLECTION,
    {
      variables: {
        collectionId,
      },
    },
    true
  );

  const handleCloseDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  if (!data)
    return (
      <Link href="/">
        <p>등록된 퀴즈가 없습니다.</p>
        <p>새 퀴즈를 등록하세요.</p>
      </Link>
    );

  return (
    <>
      <Container title="컬렉션 정보">
        <div className={styles.infoWrapper}>
          <div className={styles.infoEditBtn}>
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
                  <Link href={`/my/editcoll?id=${collectionId}`}>수정</Link>
                </Dropdown.Item>
                <Dropdown.Item variant="alert">
                  <Link href="/my/collections/delete">삭제</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {data?.getCollection.imgUrl && (
            <Image
              src={data?.getCollection.imgUrl as string}
              alt={`컬렉션 ${data?.getCollection.id} 이미지`}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
              priority
            />
          )}
          <div>
            <div className={styles.collectionAccess}>
              {data?.getCollection.access === "PRIVATE" ? (
                <div className={styles.privateLabel}>
                  <PrivateIcon />
                  <span>Private</span>
                </div>
              ) : (
                <div className={styles.publicLabel}>
                  <PublicIcon />
                  <span>Public</span>
                </div>
              )}
            </div>
            <h4>{data?.getCollection.name}</h4>
          </div>
        </div>
      </Container>
      <Container title="질문 리스트">
        <Link href="/my/newquiz" className={styles.createNewBtn}>
          <ContainedButton variant="base">+ 새 질문 추가</ContainedButton>
        </Link>
        {data?.getCollection.quizzes.map((quiz: IQuizzes) => (
          <Quiz key={quiz.id} quizId={quiz.id} />
        ))}
      </Container>
    </>
  );
}
