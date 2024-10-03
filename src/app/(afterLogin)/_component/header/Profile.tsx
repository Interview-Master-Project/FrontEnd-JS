"use client";

import Image from "next/image";
import { faker } from "@faker-js/faker";
import styles from "./profile.module.scss";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "./Header";
// import { fetchUser } from "./Header";

export default function Profile() {
  // const { data } = useQuery<IUser>({
  //   queryKey: ["user"],
  //   queryFn: fetchUser,
  // });

  const data = {
    id: "1",
    nickname: "유준상",
    OAuthProvider: "KAKAO",
  };

  const user = {
    ...data,
    image: faker.image.avatarGitHub(),
  };

  const handleClick = () => {
    console.log("clicked");
    // 드롭다운 열리기
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <Image
        src={user.image as string}
        alt={user.nickname as string}
        width={36}
        height={36}
        className={styles.userImg}
      />
      <span>{user.nickname}</span>
    </div>
  );
}
