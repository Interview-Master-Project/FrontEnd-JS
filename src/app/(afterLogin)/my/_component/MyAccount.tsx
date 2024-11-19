/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { MdModeEdit as EditIcon } from "react-icons/md";
import { KakaoLogo, NaverLogo } from "../_lib/oAuthLogo";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useLogout } from "@/hooks/useLogout";
import styles from "./myAccount.module.scss";

export default function MyAccount() {
  const { data } = useClientFetch<IData>(ME, {}, true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { handleLogout } = useLogout();

  const handleCloseDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOffDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.userProfile}>
      <h3>내 계정</h3>
      <div className={styles.profileEditBtn}>
        <Dropdown onClose={handleOffDropdown}>
          <Dropdown.Active
            onClick={handleCloseDropdown}
            boxWidth={36}
            boxHeight={36}
          >
            <EditIcon />
          </Dropdown.Active>
          <Dropdown.Menu isOpen={isDropdownOpen} containerWidth={160}>
            <Dropdown.Item>
              <Link href="/my/edit">정보 수정</Link>
            </Dropdown.Item>
            <Dropdown.Item variant="alert">
              <div onClick={handleLogout}>로그아웃</div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {data?.me.imgUrl && (
        <img
          src={data?.me.imgUrl as string}
          alt={`${data.me?.nickname}의 프로필`}
        />
      )}
      <div className={styles.logoName}>
        {data?.me.oAuthProvider === "KAKAO" && (
          <KakaoLogo className={styles.logo} />
        )}
        {data?.me.oAuthProvider === "NAVER" && (
          <NaverLogo className={styles.logo} />
        )}
        <span>{data?.me.nickname}</span>
      </div>
    </div>
  );
}
