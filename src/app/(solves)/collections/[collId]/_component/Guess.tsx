"use client";

import { useRouter } from "next/navigation";
import { useClientMutation } from "@/hooks/useClientMutation";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import InfoModal from "@/app/_component/InfoModal";
import { quizRedirect } from "../_util/quizRedirect";

type Props = {
  userCollectionAttemptId: string;
};

export default function Guess({ userCollectionAttemptId }: Props) {
  const router = useRouter();

  const handleClickContinue = (selectContinue: boolean) => {
    if (!selectContinue) {
      console.log("새로 풀기");
      // 새로 풀기
      // deleteRecentAttempt 뮤테이션으로 최근 기록 삭제
    } else {
      console.log("이어서 풀기");
      // 이어서 풀기
      // getLatestQuizzesAttempt 쿼리 조회
      //
    }
  };

  return (
    <InfoModal
      title="중단된 풀이 기록이 있습니다."
      subtitle="이어서 풀이하시겠습니까?"
      description="새로 시작하는 경우 중단 기록은 삭제됩니다."
      backButtonActive={false}
    >
      <OutlinedButton variant="gray" onClick={() => handleClickContinue(false)}>
        새로 시작
      </OutlinedButton>
      <ContainedButton onClick={() => handleClickContinue(true)}>
        이어서 풀기
      </ContainedButton>
    </InfoModal>
  );
}
