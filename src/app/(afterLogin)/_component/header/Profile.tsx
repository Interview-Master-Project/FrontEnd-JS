"use client";

import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useQuery } from "@apollo/client";
import { ME } from "@/graphql/query";
import styles from "./profile.module.scss";

export default function Profile() {
  const { data } = useQuery(ME);

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
        src={user.image}
        alt={data?.me?.nickname}
        width={36}
        height={36}
        className={styles.userImg}
      />
      <span>{data?.me?.nickname}</span>
    </div>
  );
}
