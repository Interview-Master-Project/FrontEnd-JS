"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IData, IQuizzes } from "@/graphql/query/get-collection";
import Container from "../Container";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import ContainedButton from "@/app/_component/button/ContainedButton";
import Quiz from "@/app/(afterLogin)/my/collections/_component/Quiz";
import styles from "./collectionDetails.module.scss";

type Props = {
  isCreator: boolean;
  data: IData | undefined;
};

export default function CollectionDetails({ isCreator, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDropdown = () => setIsOpen(!isOpen);
  const handleOffDropdown = () => setIsOpen(false);

  const router = useRouter();
  if (!data) {
    return (
      <>
        <p>등록된 퀴즈가 없습니다.</p>
        <p>새 퀴즈를 등록하세요.</p>
        <ContainedButton onClick={() => router.back()}>
          뒤로가기
        </ContainedButton>
      </>
    );
  }

  const collectionId = data.getCollection.id;

  return (
    <>
      <Container title="컬렉션 정보">
        <div className={styles.infoWrapper}>
          <div className={styles.infoEditBtn}>
            {isCreator && (
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
                    <Link href={`/my/collections/${collectionId}/edit`}>
                      수정
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item variant="alert">
                    <Link href={`/my/collections/${collectionId}/delete`}>
                      삭제
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
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
          <div className={styles.collectionInfo}>
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
        <Link
          href={`/my/collections/${collectionId}/newquiz`}
          className={styles.createNewBtn}
        >
          <ContainedButton variant="base">+ 새 질문 추가</ContainedButton>
        </Link>
        {data?.getCollection.quizzes.map((quiz: IQuizzes, index: number) => (
          <Quiz
            key={quiz.id}
            collectionId={collectionId}
            quizId={quiz.id}
            quizIndex={index + 1}
            isCreator={isCreator}
          />
        ))}
      </Container>
    </>
  );
}
