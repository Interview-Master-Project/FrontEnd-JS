"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return (
    <p>
      컬렉션 아이디 {params.collId}, 퀴즈 아이디 {params.quizId}의 수정 페이지.
    </p>
  );
}
