"use client";

import ContainedButton from "../button/ContainedButton";

export default function CollectionError({ onBack }: { onBack: () => void }) {
  return (
    <>
      <p>존재하지 않는 컬렉션입니다!</p>
      <p>이미 삭제된 컬렉션에 접근하려고 한 것일 수 있습니다.</p>
      <ContainedButton onClick={onBack}>뒤로가기</ContainedButton>
    </>
  );
}
