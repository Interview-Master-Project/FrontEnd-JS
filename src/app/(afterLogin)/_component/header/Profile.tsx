/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useLogout } from "@/hooks/useLogout";
import styles from "./profile.module.scss";

export default function Profile() {
  const client = useApolloClient();
  const { data, loading } = useClientFetch<IData>(
    ME,
    {
      onCompleted: (data) => {
        if (!data.me.imgUrl) {
          client.cache.readQuery({ query: ME });

          const avatar = createAvatar(thumbs, {
            seed: (+data.me.id / 5 + 1).toString(),
          }).toDataUriSync();

          client.cache.writeQuery<IData>({
            query: ME,
            data: {
              me: {
                ...data.me,
                imgUrl: avatar,
              },
            },
          });
        }
      },
    },
    true
  );

  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useLogout();

  if (loading) {
    return <div>유저 정보 불러오는 중...</div>;
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
            <Link href="/my/edit">
              <Dropdown.Item>내 정보 수정</Dropdown.Item>
            </Link>
            <div onClick={handleLogout}>
              <Dropdown.Item variant="alert">로그아웃</Dropdown.Item>
            </div>
          </>
        ) : (
          <Link href="/login">
            <Dropdown.Item>로그인</Dropdown.Item>
          </Link>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
