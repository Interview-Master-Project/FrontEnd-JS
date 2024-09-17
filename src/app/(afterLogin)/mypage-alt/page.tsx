import { gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";
import { cookies } from "next/headers";

const USER_QUERY = gql`
  query MyPage {
    myPage(
      userId: 2
      offset: 0
      limit: 3
      startDate: "2024-05-01"
      endDate: "2024-09-12"
    ) {
      user {
        id
        nickname
        oAuthProvider
      }
      collectionPage {
        collections {
          id
          name
          access
        }
        totalCount
        hasNext
      }
      quizGardens {
        date
        quizzesSolved
        dayIndex
        weekIndex
      }
    }
  }
`;

export default async function Page() {
  const client = getClient();
  const cookie = cookies();
  const token = cookie.get("authorization-token")?.value;

  console.log(token, "페이지");

  if (!token) {
    return <div>로그인이 필요합니다.</div>;
  }

  const { data } = await client.query({
    query: USER_QUERY,
    context: {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    },
  });

  return (
    <>
      <div>{data?.myPage.user.id}</div>
      <div>{data?.myPage.user.nickname}</div>
      <div>{data?.myPage.user.oAuthProvider}</div>
    </>
  );
}
