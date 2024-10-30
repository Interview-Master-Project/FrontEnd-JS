"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData as IMEData } from "@/graphql/query/me";
import {
  GET_COLLECTION,
  IData,
  IQuizzes,
} from "@/graphql/query/get-collection";
import Container from "@/app/(afterLogin)/_component/Container";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import ContainedButton from "@/app/_component/button/ContainedButton";
import Quiz from "@/app/(afterLogin)/my/collections/_component/Quiz";
import styles from "./page.module.scss";

type Props = {
  params: {
    collId: string;
  };
};

// GET_COLLECTION의 data fetch 필요
// creator 와 나의 id 대조 후 interaction 기능 유무 판별
export default function Page({ params }: Props) {
  const { data: dataOfMe } = useClientFetch<IMEData>(ME, {}, true);
  const { data } = useClientFetch<IData>(
    GET_COLLECTION,
    {
      variables: {
        collectionId: params.collId,
      },
    },
    true
  );

  const [createdByMe, setCreatedByMe] = useState<boolean | null>(null);
  useEffect(() => {
    if (data?.getCollection.creator.id === dataOfMe?.me.id) {
      setCreatedByMe(true);
    } else setCreatedByMe(false);
  }, [data?.getCollection.creator.id, dataOfMe?.me.id]);

  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDropdown = () => setIsOpen(!isOpen);
  const handleOffDropdown = () => setIsOpen(false);

  if (!data) {
    return (
      <Link href="/explore">
        <p>등록된 퀴즈가 없습니다.</p>
        <p>새 퀴즈를 등록하세요.</p>
      </Link>
    );
  }

  return (
    <main className={styles.main}>
      <Container title="컬렉션 정보">
        <div className={styles.infoWrapper}>
          <div className={styles.infoEditBtn}>
            {createdByMe && (
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
                    <Link href={`/my/collections/${params.collId}/edit`}>
                      수정
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item variant="alert">
                    <Link href={`/my/collections/${params.collId}/delete`}>
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
        <Link href="/my/newquiz" className={styles.createNewBtn}>
          <ContainedButton variant="base">+ 새 질문 추가</ContainedButton>
        </Link>
        {data?.getCollection.quizzes.map((quiz: IQuizzes, index: number) => (
          <Quiz
            key={quiz.id}
            collectionId={params.collId}
            quizId={quiz.id}
            quizIndex={index + 1}
          />
        ))}
      </Container>
    </main>
  );
}
