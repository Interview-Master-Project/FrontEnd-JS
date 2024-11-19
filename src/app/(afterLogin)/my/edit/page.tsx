/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEventHandler, useMemo, useRef } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { FormGroup } from "../../_component/formGroup/FormGroup";
import { useUserEditStore } from "@/store/useUserEditStore";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import {
  AiOutlineCheck as VMark,
  AiOutlineClose as XMark,
} from "react-icons/ai";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./page.module.scss";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function Page() {
  const {
    image,
    nickname,
    setSubmitImage,
    setPreviewImage,
    setDeleteImgOnly,
    setSubmitNickname,
    isValidNickname,
  } = useUserEditStore();
  const imageRef = useRef<HTMLInputElement>(null);
  const { data } = useClientFetch<IData>(
    ME,
    {
      onCompleted: (data) => {
        setPreviewImage(data?.me.imgUrl!, "init");
        setSubmitNickname(data?.me.nickname, "init");
      },
      fetchPolicy: "cache-only",
    },
    true
  );

  // 아바타 이미지
  const defaultAvatar = useMemo(() => {
    if (!data?.me.id) return null;

    return createAvatar(thumbs, {
      seed: (+data?.me.id / 5 + 1).toString(),
    }).toDataUriSync();
  }, [data]);

  const handlePreviewImage = (file: File | undefined) => {
    if (!file) return null;

    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 2MB를 초과할 수 없습니다.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
  };

  const { isLoading, error, handleSubmit } = useFormSubmit({
    endpoint: "/api/users",
    onSuccess: () => redirect("/my"),
    onError: (error) =>
      console.error(`유저 정보 수정에 실패했습니다: ${error}`),
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (nickname.toBe) {
      formData.append("name", nickname.toBe);
    }
    if (image.toBe) formData.append("image", image.toBe);
    if (image.deleteImgOnly)
      formData.append("deleteImageOnly", image.deleteImgOnly.toString());

    console.log("formData 출력 test: ", formData);
    // handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <FormGroup formName="imgUrl" label="프로필 이미지 수정" optional>
        <input
          type="file"
          id="imgUrl"
          name="imgUrl"
          accept=".jpg,.jpeg,.png"
          ref={imageRef} // 클릭 감지용
          onChange={(e) => {
            handlePreviewImage(e.target.files?.[0]);
            if (e.target.files?.[0]) setSubmitImage(e.target.files?.[0]);
          }}
          hidden
        />
        <img
          src={image.preview ?? image.init}
          alt="유저 이미지"
          style={{ width: 80, height: 80 }}
        />
        <div className={styles.groupSection}>
          <span>
            이미지는 <strong>.jpg .jpeg .png</strong> 확장자만 가능합니다.
          </span>
          <div className={styles.imageBtn}>
            {!image.toBe && (
              <ContainedButton
                type="button"
                variant="green"
                onClick={() => imageRef.current?.click()}
              >
                이미지 첨부
              </ContainedButton>
            )}
            {image.toBe && (
              <OutlinedButton
                type="button"
                variant="red"
                onClick={() => {
                  setDeleteImgOnly(true);
                  setPreviewImage(defaultAvatar!);
                  setSubmitImage(null);
                }}
              >
                초기화
              </OutlinedButton>
            )}
          </div>
        </div>
      </FormGroup>
      <FormGroup formName="nickname" label="이름 수정">
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={nickname.toBe ?? nickname.init ?? ""}
          onBlur={(e) => isValidNickname(e.target.value)}
          onChange={(e) => setSubmitNickname(e.target.value)}
          required
        />
        <FormGroup.Message validity={nickname.valid}>
          {nickname.valid ? (
            <>
              <VMark />
              <p>사용 가능한 이름입니다.</p>
            </>
          ) : (
            <>
              <XMark />
              <p>공백이나 빈칸은 이름으로 설정 불가합니다.</p>
            </>
          )}
        </FormGroup.Message>
      </FormGroup>

      {error && <p>{error}</p>}

      <div className={styles.formFooter}>
        <ContainedButton type="submit" disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장"}
        </ContainedButton>
        <ContainedButton variant="red">
          <Link href="/my">뒤로가기</Link>
        </ContainedButton>
      </div>
      <div className={styles.formFooter}>
        <h3>Danger Zone</h3>
        <OutlinedButton variant="red" type="button">
          회원 탈퇴
        </OutlinedButton>
      </div>
    </form>
  );
}
