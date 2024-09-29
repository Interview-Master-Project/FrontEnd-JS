"use client";

import Image from "next/image";
import { faker } from "@faker-js/faker";
import styles from "./profile.module.scss";

export default function Profile() {
  // dummy data
  const user = {
    username: "유준상",
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
        alt={user.username}
        width={36}
        height={36}
        className={styles.userImg}
      />
      <span>{user.username}</span>
    </div>
  );
}
