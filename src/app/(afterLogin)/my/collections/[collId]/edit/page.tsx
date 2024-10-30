"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return <p>{params.collId}의 컬렉션 수정 페이지.</p>;
}
