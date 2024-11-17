"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";
import styles from "./profile.module.scss";

export default function Profile() {
  const { data, error, loading } = useClientFetch<IData>(ME, {}, true);
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useLogout();

  useEffect(() => {
    if (data?.me.imgUrl) setImage(data?.me.imgUrl);
  }, [data?.me.imgUrl]);

  const { user: userInfo } = useUserStore();
  const avatar = useMemo(() => {
    return createAvatar(thumbs, {
      seed: "4",
    }).toDataUriSync();
  }, []);

  const user = {
    ...data,
    image: image ?? avatar,
  };

  const handleCloseDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  if (loading) {
    return <div>유저 정보 불러오는 중...</div>;
  }

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Active
        onClick={handleCloseDropdown}
        boxWidth={110}
        boxHeight={80}
      >
        <div className={styles.container}>
          {user.image && (
            <img
              src={user.image}
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
