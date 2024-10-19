"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
  provider: string;
};

export default function Auth2Redirect({ provider }: Props) {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    // 쿼리 파라미터 추출
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const codeParam = url.searchParams.get("code");
      const stateParam = url.searchParams.get("state");
      if (codeParam) setCode(codeParam);
      if (stateParam) setState(stateParam);
    }
  }, []);

  const Login = useCallback(
    async (authorizationCode: string) => {
      try {
        const url = `/api/auth/${provider}`;
        const response = await axios.post(
          url,
          {
            authorizationCode,
            state: state || null, // state가 없으면 null로 설정
          },
          {
            withCredentials: true,
          }
        );

        const token = response.headers.authorization;
        if (token) {
          document.cookie = `authToken=${token}; path=/; max-age=360000`; // 쿠키 만료 시간 설정 (100시간)
        }

        const success = response.data;
        if (success) {
          router.replace("/explore");
        } else {
          // 로그인 실패
          console.error("예상치 못한 에러로 인해 로그인이 실패했습니다.");
        }
      } catch (err) {
        console.error("로그인에 실패했습니다.", err);
      }
    },
    [provider, router, state]
  );

  useEffect(() => {
    if (code) {
      Login(code);
    }
  }, [code, Login]);

  return null;
}
