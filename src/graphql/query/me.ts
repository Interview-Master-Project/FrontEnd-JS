import { gql } from "@apollo/client";

export interface IData {
  me: {
    id: string;
    nickname: string;
    imgUrl: string | null;
    email: string;
    oAuthProvider: "KAKAO" | "NAVER";
  };
}

// 로그인 유저 정보
export const ME = gql`
  query MyQuery {
    me {
      id
      nickname
      imgUrl
      email
      oAuthProvider
    }
  }
`;
