"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import styles from "./profile.module.scss";

export default function Profile() {
  const { data, error, loading } = useClientFetch<IData>(ME, {}, true);
  const user = {
    ...data,
    image: faker.image.avatarGitHub(),
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Dropdown onClose={() => setIsOpen(false)} className={styles.dropdown}>
        <Dropdown.Active onClick={() => setIsOpen(true)}>
          <></>
        </Dropdown.Active>
        <Dropdown.Menu isOpen={isOpen}>
          <Dropdown.Item>
            <Link href="/my">마이페이지</Link>
          </Dropdown.Item>
          <Dropdown.Item variant="alert">
            <Link href="/home">로그아웃</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Image
        src={user.image}
        alt={`${user.me?.nickname}의 이미지`}
        width={36}
        height={36}
        className={styles.userImg}
      />
      <span>{data?.me.nickname ?? "로그인"}</span>
    </div>
  );
}
