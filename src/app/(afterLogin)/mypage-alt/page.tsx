import { getClient } from "@/graphql/apolloClient";
// import { USER_QUERY } from "@/graphql/query";
import { USER_ATTEMPTED_COLLECTIONS } from "@/graphql/query";

export default async function Page() {
  console.log("TOKEN: ", process.env.NEXT_PUBLIC_STATIC_TOKEN);

  const client = getClient();

  // 서버 컴포넌트에서는 props나 context를 통해 토큰을 전달받아야 함
  const { data } = await client.query({
    query: USER_ATTEMPTED_COLLECTIONS,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STATIC_TOKEN}`,
      },
    },
  });

  console.log(data);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {data?.userAttemptedCollections.collections.map(
          ({ id, name, access, imgUrl }: any) => (
            <div key={id} style={{ display: "flex", gap: 20 }}>
              <span>{name}</span>
              <span>{access}</span>
              <span>{imgUrl}</span>
              <img src={imgUrl} alt="" />
            </div>
          )
        )}
      </div>
    </>
  );

  // return (
  //   <>
  //     <div style={{ display: "flex", gap: "10px" }}>
  //       <span>유저 이름: {data?.myPage.user.nickname}</span>
  //       <span>인증정보: {data?.myPage.user.oAuthProvider}</span>
  //     </div>
  //     <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
  //       {data?.myPage.collectionPage.collections.map(
  //         ({ id, name, access, imgUrl }: any) => (
  //           <div key={id}>
  //             <span>{name}</span>
  //             <span>{access}</span>
  //             <img
  //               src={imgUrl}
  //               alt="이미지"
  //               style={{ width: 300, height: 300 }}
  //             />
  //           </div>
  //         )
  //       )}
  //     </div>
  //   </>
  // );
}
