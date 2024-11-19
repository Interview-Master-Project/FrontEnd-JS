"use client";

import { FormEventHandler, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData } from "@/graphql/query/me";
import { FormGroup } from "../../_component/formGroup/FormGroup";
import {
  AiOutlineCheck as VMark,
  AiOutlineClose as XMark,
} from "react-icons/ai";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./page.module.scss";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function Page() {
  const { data } = useClientFetch<IData>(
    ME,
    {
      onCompleted: (data) => {
        setEnteredNickname(data.me.nickname);
        setImage(data.me.imgUrl);
      },
    },
    true
  );
  const [image, setImage] = useState<string | File | null>(null);
  const [viewerImage, setViewerImage] = useState<any>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [enteredNickname, setEnteredNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState<boolean | null>(null);
  const handleValidateNickname = () => {
    if (enteredNickname.trim().length < 1) {
      setIsValidNickname(false);
    } else {
      setIsValidNickname(true);
    }
  };

  const handleChangeImage = (file: File | undefined) => {
    if (!file) return null;

    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 2MB를 초과할 수 없습니다.");
      setImage(null);
      setViewerImage(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setViewerImage(reader.result as string);
    };
  };

  const { isLoading, error, handleSubmit } = useFormSubmit({
    endpoint: "/api/users",
    onSuccess: () => {
      window.location.assign("/my");
    },
    onError: (error) => console.error(error),
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (defaultImage) formData.append("deleteImageOnly", "true");
    if (data?.me.nickname !== enteredNickname) {
      formData.append("name", enteredNickname);
    }
    if (image) formData.append("image", image);

    handleSubmit(formData);
  };

  const [defaultImage, setDefaultImage] = useState(false);
  const defaultImg = useMemo(() => {
    return createAvatar(thumbs, {
      seed: (+data?.me.id! / 5 + 1).toString(),
    }).toDataUriSync();
  }, [data?.me.id]);

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <FormGroup formName="imgUrl" label="프로필 이미지 수정" optional>
        <input
          type="file"
          id="imgUrl"
          name="imgUrl"
          accept=".jpg,.jpeg,.png"
          ref={imageRef}
          onChange={(e) => {
            setDefaultImage(false);
            handleChangeImage(e.target.files?.[0]);
            setImage(e.target.files?.[0]!);
          }}
          hidden
        />
        <img
          src={
            viewerImage ?? defaultImage
              ? defaultImg
              : (data?.me.imgUrl as string)
          }
          alt="유저 이미지"
          style={{ width: 80, height: 80 }}
        />
        <div className={styles.groupSection}>
          <span>
            이미지는 <strong>.jpg .jpeg .png</strong> 확장자만 가능합니다.
          </span>
          <div className={styles.imageBtn}>
            <ContainedButton
              type="button"
              variant="base"
              onClick={() => {
                setDefaultImage(true);
                setViewerImage(null);
                setImage(null);
              }}
            >
              기본 이미지로 초기화
            </ContainedButton>
            {!image && (
              <ContainedButton
                type="button"
                variant="green"
                onClick={() => imageRef.current?.click()}
              >
                이미지 첨부
              </ContainedButton>
            )}
            {image && (
              <OutlinedButton
                type="button"
                variant="red"
                onClick={() => {
                  setViewerImage(null);
                  setImage(null);
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
          value={enteredNickname}
          onBlur={handleValidateNickname}
          onChange={(e) => setEnteredNickname(e.target.value)}
          required
        />
        <FormGroup.Message validity={isValidNickname}>
          {isValidNickname ? (
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
        <p>해당 기능은 아직 준비중입니다...</p>
      </div>
    </form>
  );
}
