import { useCookies } from "next-client-cookies";

export const useGetToken = () => {
  const cookies = useCookies();
  const token = cookies.get("authToken");

  const headers = { Authorization: `Bearer ${token}` };

  return { headers };
};
