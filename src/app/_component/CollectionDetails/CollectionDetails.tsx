"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IDetailsProps } from "@/types/CollectionDetails/types";
import { useFetchCollection } from "@/hooks/CollectionDetails/useFetchCollection";
import Container from "@/app/(afterLogin)/_component/Container";
import ContainedButton from "../button/ContainedButton";
import CollectionError from "./CollectionError";
import InfoEditBtn from "./InfoEditBtn";
import CollectionInfo from "./CollectionInfo";
import styles from "./collectionDetails.module.scss";

export default function CollectionDetails({
  isCreator,
  collId,
}: IDetailsProps) {
  const router = useRouter();
  const { collectionData, collectionLoading, collectionError } =
    useFetchCollection(collId);

  if (collectionError) {
    return <CollectionError onBack={() => router.back()} />;
  }
  if (collectionLoading) {
    return <div>컬렉션 정보 불러오는 중...</div>;
  }

  return (
    <Container title="컬렉션 정보">
      <ContainedButton className={styles.startBtn}>
        <Link href={`/collections/${collId}`}>문제 풀기</Link>
      </ContainedButton>
      <div className={styles.infoWrapper}>
        <InfoEditBtn isCreator={isCreator} collId={collId} />
        <Image
          src={collectionData?.getCollection?.imgUrl as string}
          alt={`컬렉션 ${collectionData?.getCollection?.id} 이미지`}
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
        />
        <CollectionInfo
          access={collectionData?.getCollection?.access}
          name={collectionData?.getCollection?.name}
        />
      </div>
    </Container>
  );
}
