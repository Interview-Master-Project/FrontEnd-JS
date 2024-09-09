"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>id가 {id}인 컬렉션 페이지 입니다.</div>;
}
