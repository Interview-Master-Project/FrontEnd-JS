"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useLogout } from "@/hooks/useLogout";
import styles from "./profile.module.scss";

export default function Profile() {
  const { data, loading, error } = useClientFetch<IData>(ME, {}, true);

  const client = useApolloClient();
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useLogout();

  if (loading) {
    return <div>유저 정보 불러오는 중...</div>;
  }

  if (data && !data?.me.imgUrl) {
    const { me }: IData = client.cache.readQuery({ query: ME })!;
    const avatar = createAvatar(thumbs, {
      seed: (+data?.me.id! / 5 + 1).toString(),
    }).toDataUriSync();

    client.cache.writeQuery<IData>({
      query: ME,
      data: {
        me: {
          ...me,
          imgUrl: avatar,
        },
      },
    });
  }

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
          {data?.me.imgUrl && (
            <img
              src={data?.me.imgUrl as string}
              alt={`${data?.me.nickname}의 이미지`}
              width={36}
              height={36}
              className={styles.userImg}
            />
          )}
          <span>{data?.me.nickname ?? "로그인"}</span>
        </div>
      </Dropdown.Active>
      <Dropdown.Menu isOpen={isOpen} containerWidth={120} positionTop={60}>
        {data ? (
          <>
            <Dropdown.Item>
              <Link href="/my">마이페이지</Link>
            </Dropdown.Item>
            <Dropdown.Item variant="alert">
              <div onClick={handleLogout}>로그아웃</div>
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item>
            <Link href="/login">로그인</Link>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
