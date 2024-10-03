import styles from "./header.module.scss";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Profile from "./Profile";
import TabMenu from "./TabMenu";
// import { getClient } from "@/graphql/apolloClient";
// import { USER_QUERY } from "@/graphql/query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export interface IUser {
  id: string;
  nickname: string;
  OAuthProvider: string;
}

// export async function fetchUser() {
//   const client = getClient();
//   const { data }: { data: IUser } = await client.query({
//     query: USER_QUERY,
//     context: {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_STATIC_TOKEN}`,
//       },
//     },
//   });

//   console.log("user data: ", data);
//   return data;
// }

export default async function Header() {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["user"],
  //   queryFn: fetchUser,
  // });

  const dehydrateState = dehydrate(queryClient);
  queryClient.getQueryData(["user"]);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <h3>Logo</h3>
        </div>
        <div className={styles.tab}>
          <TabMenu to="/home">질문 리스트</TabMenu>
          <TabMenu to="/mypage">마이페이지</TabMenu>
        </div>
      </div>
      <HydrationBoundary state={dehydrateState}>
        <Profile />
      </HydrationBoundary>
    </header>
  );
}
