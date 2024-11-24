"use client";

import ContainedButton from "../button/ContainedButton";

export default function CollectionError({ onBack }: { onBack: () => void }) {
  return (
    <>
      <p>등록된 퀴즈가 없습니다.</p>
      <p>새 퀴즈를 등록하세요.</p>
      <ContainedButton onClick={onBack}>뒤로가기</ContainedButton>
    </>
  );
}
