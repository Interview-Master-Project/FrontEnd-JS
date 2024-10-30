"use client";

import Link from "next/link";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { FormEventHandler, useState } from "react";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./page.module.scss";

// img 수정 - 아직
// nickname 수정
// 최하단에 회원 탈퇴 버튼 생성 (modal)
export default function Page() {
  const { data } = useClientFetch<IData>(ME, {}, true);
  const [enteredNickname, setEnteredNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState<boolean | null>(null);
  const handleValidateNickname = () => {
    if (enteredNickname.trim().length < 1) {
      setIsValidNickname(false);
    } else {
      setIsValidNickname(true);
    }
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    alert("미구현 폼 제출 확인"); // test
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <div className={styles.formGroup}>
        <label htmlFor="imgUrl">프로필 이미지 수정</label>
        <input id="imgUrl" name="imgUrl" type="file" />
        <img src={undefined} alt="유저 이미지" />
        <p>해당 기능은 아직 준비중입니다...</p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="nickname">이름 수정</label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder={data?.me.nickname}
          value={enteredNickname}
          onBlur={handleValidateNickname}
          onChange={(e) => setEnteredNickname(e.target.value)}
        />
        {isValidNickname !== null &&
          (isValidNickname ? (
            <p>사용 가능한 이름입니다.</p>
          ) : (
            <p>공백 및 한 글자 미만은 사용할 수 없습니다.</p>
          ))}
        <p>해당 기능은 아직 준비중입니다...</p>
      </div>

      <div className={styles.formFooter}>
        <ContainedButton type="submit">저장</ContainedButton>
        <ContainedButton variant="red">
          <Link href="/my">뒤로가기</Link>
        </ContainedButton>
      </div>
      <div className={styles.formFooter}>
        <h3>Danger Zone</h3>
        <OutlinedButton variant="red" type="button">
          회원 탈퇴
        </OutlinedButton>
        <p>해당 기능은 아직 준비중입니다...</p>
      </div>
    </form>
  );
}
