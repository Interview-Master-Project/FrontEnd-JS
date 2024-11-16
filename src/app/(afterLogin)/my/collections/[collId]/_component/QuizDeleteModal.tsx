"use client";

import InfoModal from "@/app/_component/InfoModal";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import { useRouter, useParams } from "next/navigation";
import { DELETE_QUIZ } from "@/graphql/mutation/delete-quiz";
import { useMutation } from "@apollo/client";
import { useCookies } from "next-client-cookies";
import { GET_COLLECTION } from "@/graphql/query/get-collection";

export default function QuizDeleteModal() {
  const router = useRouter();
  const { collId, quizId } = useParams();
  const [deleteQuiz] = useMutation(DELETE_QUIZ);

  const cookies = useCookies();
  const token = cookies.get("authToken");

  const handleDelete = async () => {
    try {
      await deleteQuiz({
        variables: { quizId },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      window.location.assign(`/my/collections/${collId}`);
    } catch (error) {
      console.error("질문 삭제 오류:", error);
      // 필요 시 에러 처리를 위한 추가 로직 작성
    }
  };

  return (
    <>
      <InfoModal title="질문 삭제" description="이 질문을 삭제하시겠습니까?">
        <ContainedButton onClick={() => router.back()}>취소</ContainedButton>
        <OutlinedButton variant="red" onClick={handleDelete}>
          삭제
        </OutlinedButton>
      </InfoModal>
    </>
  );
}
