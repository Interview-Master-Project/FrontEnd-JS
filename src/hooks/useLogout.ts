import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useApolloClient } from "@apollo/client";

export const useLogout = () => {
  const router = useRouter();
  const client = useApolloClient();

  const handleLogout = useCallback(() => {
    try {
      document.cookie =
        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

      client.clearStore();

      router.replace("/");
    } catch (err) {
      console.error("로그아웃에 실패했습니다.", err);
    }
  }, [router, client]);

  return { handleLogout };
};
