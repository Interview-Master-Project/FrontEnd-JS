import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 공용 및 보호된 경로 정의
const PUBLIC_ROUTE = ["/"];
const PRIVATE_ROUTE = ["/my/:path*", "/collections/:path*"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken")?.value;

  // "/" 경로 처리: 토큰이 있으면 "/explore"으로 리다이렉트
  if (PUBLIC_ROUTE.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/explore", req.url));
    }
    return NextResponse.next(); // 토큰이 없으면 통과
  }

  // 보호된 경로 처리: 토큰이 없으면 "/login"으로 리다이렉트
  if (
    PRIVATE_ROUTE.some((route) =>
      pathname.startsWith(route.replace(":path*", ""))
    )
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // 토큰이 있거나 보호되지 않은 경로면 통과
}

// 미들웨어 적용 경로 설정
export const config = {
  matcher: [...PUBLIC_ROUTE, ...PRIVATE_ROUTE],
};
