"use client";

import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import styles from "./myAccount.module.scss";
import { useState } from "react";

export default function MyAccount() {
  const [editDropdown, setEditDropdown] = useState(false);

  // dummy data
  const user = {
    username: "유준상",
    image: faker.image.urlLoremFlickr(),
  };

  const handleDropdown = () => {
    setEditDropdown((prevState) => !prevState);
  };

  return (
    <div className={styles.userProfile}>
      <h3>내 계정</h3>
      <MdModeEdit className={styles.profileEditBtn} onClick={handleDropdown} />
      {editDropdown && (
        <div className={styles.profileEditDropdown}>
          <div>로그아웃</div>
          <div>회원탈퇴</div>
        </div>
      )}
      <Image src={user.image} alt={user.username} width={144} height={144} />
      <span>{user.username}</span>
    </div>
  );
}
