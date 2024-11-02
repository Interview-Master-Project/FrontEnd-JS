"use client";

import { useParams, useRouter } from "next/navigation";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import InfoModal from "@/app/_component/InfoModal";
import { useMutation } from "@apollo/client";

export default function Page() {
  const router = useRouter();
  const { collId: collectionId, quizId } = useParams();
  // const [deleteQuiz] = useMutation()

  const handleDelete = () => {
    return;
  };

  return (
    <>
      <InfoModal title="퀴즈 삭제" description="이 퀴즈를 삭제하시겠습니까?">
        <ContainedButton onClick={() => router.back()}>취소</ContainedButton>
        <OutlinedButton variant="red" onClick={handleDelete}>
          삭제
        </OutlinedButton>
      </InfoModal>
    </>
  );
}
