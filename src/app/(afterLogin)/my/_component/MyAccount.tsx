"use client";

import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { KakaoLogo, NaverLogo } from "../_lib/oAuthLogo";
import { ME } from "@/graphql/query";
import { IMe } from "@/model/me";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useQuery } from "@apollo/client";
import styles from "./myAccount.module.scss";

export default function MyAccount() {
  const { data } = useQuery<IMe>(ME);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = {
    ...data,
    image: faker.image.avatarGitHub(),
  };

  const handleActiveDropdown = () => {};

  const handleClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.userProfile}>
      <h3>내 계정</h3>
      <Dropdown
        onActive={handleActiveDropdown}
        className={styles.profileEditBtn}
      >
        <Dropdown.Active onClick={handleClickDropdown}>
          <MdModeEdit />
        </Dropdown.Active>
        <Dropdown.Menu isOpen={isDropdownOpen}>
          <Dropdown.Item>
            <Link href="/mypage/logout">로그아웃</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/mypage/delete-account">회원탈퇴</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Image
        src={user.image}
        alt={user.me?.id as string}
        width={144}
        height={144}
      />
      <div className={styles.logo_name}>
        {user?.me?.oAuthProvider === "KAKAO" && <KakaoLogo />}
        {user?.me?.oAuthProvider === "NAVER" && <NaverLogo />}
        <span>{user?.me?.nickname}</span>
      </div>
    </div>
  );
}
