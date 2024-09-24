"use client";

import { usePathname } from "next/navigation";

export default function Title() {
  const pathname = usePathname();

  let title = "마이페이지"; // 기본 타이틀 설정
  // 경로에 따른 타이틀 변경
  if (pathname === "/mypage/newcoll") {
    title = "새 컬렉션 추가";
  } else if (pathname === "/mypage/newquiz") {
    title = "새 질문 추가";
  } else if (pathname === "/mypage") {
    title = "마이페이지";
  } else if (pathname === "/mypage/editcoll") {
    title = "컬렉션 수정";
  } else {
    title = "";
  }

  return <>{title}</>;
}
