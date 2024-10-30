"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return <p>컬렉션 id {params.collId}의 생성 페이지입니다.</p>;
}
