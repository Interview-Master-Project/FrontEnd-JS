"use client";

import axios from "axios";
import { useCallback, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ME, IData } from "@/graphql/query/me";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

type Props = {
  provider: string;
  code: string;
  state: string | null;
};

export default function Auth2Redirect({ provider, code, state }: Props) {
  const router = useRouter();

  const cookies = useCookies();
  const token = cookies.get("authToken");
  const [me] = useLazyQuery<IData>(ME, {
    context: {
      headers: { Authorization: `Bearer ${token}` },
    },
    fetchPolicy: "network-only",
  });

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
          me();
          router.push("/explore");
        } else {
          // 로그인 실패
          console.error("예상치 못한 에러로 인해 로그인이 실패했습니다.");
        }
      } catch (err) {
        console.error("로그인에 실패했습니다.", err);
      }
    },
    [provider, state, me, router]
  );

  useEffect(() => {
    Login(code);
  }, [Login, code]);

  return null;
}
