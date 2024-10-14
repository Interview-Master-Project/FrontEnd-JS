"use client";

import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useQuery } from "@apollo/client";
import { ME } from "@/graphql/query";
import { IMe } from "@/model/me";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useState } from "react";
import Link from "next/link";
import styles from "./profile.module.scss";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery<IMe>(ME);

  const user = {
    ...data,
    image: faker.image.avatarGitHub(),
  };

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
        alt={data?.me.id as string}
        width={36}
        height={36}
        className={styles.userImg}
      />
      <span>{data?.me.nickname ?? "로그인"}</span>
    </div>
  );
}
