import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 쿠키에서 authorization.token 가져오기
  const token = req.cookies.get("authorization-token");

  console.log(token, "미들웨어");

  // 토큰이 없다면 로그인 페이지로 리다이렉션
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 토큰이 있다면 진행
  return NextResponse.next();
}

// 미들웨어 적용 경로 추가
export const config = {
  matcher: ["/mypage-alt"],
};
