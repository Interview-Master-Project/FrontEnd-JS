"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";

export default function Callback() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 추출
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // 현재 경로의 첫 번째 부분 추출 (예: "kakao" 또는 "naver")
    const pathParts = pathname.split("/");
    const platform = pathParts[1]; // "kakao", "naver" 등을 추출

    if (code) {
      // 백엔드로 요청 보내기
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/api/auth/${platform}`;
      axios.defaults.withCredentials = true;
      axios
        .post(url, {
          authorizationCode: code,
          state: state || null, // state가 없으면 null로 설정
        })
        .then((response) => {
          const success = response.data;
          console.log(success);
          if (success) {
            router.push("/home");
          } else {
            console.error("Unexpected response:", success);
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  }, [pathname, searchParams, router]);

  return (
    <div>
      <p>Processing Login....</p>
    </div>
  );
}
