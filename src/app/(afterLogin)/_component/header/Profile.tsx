"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useLogout } from "@/hooks/useLogout";
import styles from "./profile.module.scss";

export default function Profile() {
  const { data, error, loading } = useClientFetch<IData>(ME, {}, true);
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useLogout();

  useEffect(() => {
    setImage(faker.image.avatarGitHub());
  }, []);

  const user = {
    ...data,
    image,
  };

  const handleCloseDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Active
        onClick={handleCloseDropdown}
        boxWidth={110}
        boxHeight={80}
      >
        <div className={styles.container}>
          {image && (
            <Image
              src={user.image as string}
              alt={`${user.me?.nickname}의 이미지`}
              width={36}
              height={36}
              className={styles.userImg}
            />
          )}
          <span>{data?.me.nickname ?? "로그인"}</span>
        </div>
      </Dropdown.Active>
      <Dropdown.Menu isOpen={isOpen} containerWidth={120} positionTop={60}>
        <Dropdown.Item>
          <Link href="/my">마이페이지</Link>
        </Dropdown.Item>
        <Dropdown.Item variant="alert">
          <div onClick={handleLogout}>로그아웃</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
