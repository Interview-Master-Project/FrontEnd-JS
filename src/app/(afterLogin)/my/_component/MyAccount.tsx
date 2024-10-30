"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ME, IData } from "@/graphql/query/me";
import { useClientFetch } from "@/hooks/useClientFetch";
import { MdModeEdit as EditIcon } from "react-icons/md";
import { faker } from "@faker-js/faker";
import { KakaoLogo, NaverLogo } from "../_lib/oAuthLogo";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useLogout } from "@/hooks/useLogout";
import styles from "./myAccount.module.scss";

export default function MyAccount() {
  const { data, loading, error } = useClientFetch<IData>(ME, {}, true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const { handleLogout } = useLogout();

  useEffect(() => {
    setImage(faker.image.avatarGitHub());
  }, []);

  const user = {
    ...data,
    image,
  };

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
              <Link href="/my/edit">내 정보 수정</Link>
            </Dropdown.Item>
            <Dropdown.Item variant="alert">
              <div onClick={handleLogout}>로그아웃</div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {image && (
        <Image
          src={user.image as string}
          alt={`${user.me?.nickname}의 프로필`}
          width={144}
          height={144}
          priority
        />
      )}
      <div className={styles.logoName}>
        {user?.me?.oAuthProvider === "KAKAO" && (
          <KakaoLogo className={styles.logo} />
        )}
        {user?.me?.oAuthProvider === "NAVER" && (
          <NaverLogo className={styles.logo} />
        )}
        <span>{user?.me?.nickname}</span>
      </div>
    </div>
  );
}
