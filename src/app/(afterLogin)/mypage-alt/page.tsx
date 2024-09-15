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
          imgUrl
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
  const ourCookies = cookies();

  // let token = ourCookies.get("authorization-token")!.value;

  // let tokenParsed = JSON.parse(token);

  const { data } = await client.query({
    query: USER_QUERY,
    context: {
      // headers: {
      //   Authorization: `Bearer ${tokenParsed}`,
      // },
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
