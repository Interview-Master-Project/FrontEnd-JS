"use client";

import InfoModal from "@/app/_component/InfoModal";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import { useRouter, useParams } from "next/navigation";
import { DELETE_COLLECTION } from "@/graphql/mutation/delete-collection";
import { useMutation } from "@apollo/client";
import { useCookies } from "next-client-cookies";

export default function CollectionDeleteModal() {
  const router = useRouter();
  const { collId } = useParams();
  const [deleteCollection] = useMutation(DELETE_COLLECTION);

  const cookies = useCookies();
  const token = cookies.get("authToken");

  const handleDelete = async () => {
    try {
      await deleteCollection({
        variables: { collectionId: collId },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      window.location.assign("/my");
    } catch (error) {
      console.error("컬렉션 삭제 오류:", error);
      // 필요 시 에러 처리를 위한 추가 로직 작성
    }
  };

  return (
    <>
      <InfoModal
        title="컬렉션 삭제"
        description="이 컬렉션을 삭제하시겠습니까?"
      >
        <ContainedButton onClick={() => router.back()}>취소</ContainedButton>
        <OutlinedButton variant="red" onClick={handleDelete}>
          삭제
        </OutlinedButton>
      </InfoModal>
    </>
  );
}
