"use client";

import styles from "./page.module.scss";
import Container from "../../_component/Container";
import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import publicIcon from "../../../../../public/globe.png";
import privateIcon from "../../../../../public/lock.png";
import TextAreaAutoSize from "react-textarea-autosize";
import clsx from "clsx";

export default function Page() {
  const [previewImage, setPreviewImage] =
    useState<string>("/default_image.png");
  const imageRef = useRef<HTMLInputElement>(null);
  const [enteredTitle, setEnteredTitle] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState<boolean | null>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(event.target.value);
    setEditTitle(true);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);

    if (enteredTitle!.trim().length < 3) {
      setIsValidTitle(false);
    } else {
      setIsValidTitle(true);
    }
  };

  // 이미지 첨부 change 시
  const handleInputImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
    }
  };

  // 이미지 첨부 초기화
  const handleResetImage = () => {
    setPreviewImage("/default_image.png");
  };

  return (
    <form className={styles.form}>
      <Container title="컬렉션 제목">
        <div className={styles.imgTitleSection}>
          <div className={styles.imgSection}>
            <label htmlFor="imageInput">이미지 첨부</label>
            <input
              type="file"
              id="imageInput"
              name="image"
              ref={imageRef}
              onChange={handleInputImage}
              hidden
            />
            <Image src={previewImage} alt="미리보기" width={80} height={80} />
            <button
              onClick={handleResetImage}
              className={clsx(
                previewImage === "/default_image.png"
                  ? styles.resetImageBtn__hidden
                  : styles.resetImageBtn
              )}
            >
              초기화
            </button>
          </div>
          <div>
            <input
              id="title"
              name="title"
              type="search"
              className={styles.titleInput}
              value={enteredTitle ?? ""}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              placeholder="컬렉션 제목을 적어주세요"
            />
            {!editTitle &&
              enteredTitle !== null &&
              (!isValidTitle ? (
                <p style={{ color: "red" }}>3글자 이상 입력하세요.</p>
              ) : (
                <p style={{ color: "green" }}>사용 가능한 컬렉션 제목입니다.</p>
              ))}
          </div>
        </div>
      </Container>
      <Container title="상세 설명">
        <TextAreaAutoSize
          id="description"
          name="description"
          className={styles.description}
          placeholder="컬렉션의 상세 설명을 적어주세요."
        ></TextAreaAutoSize>
      </Container>
      <Container title="공개 범위 여부">
        <div className={styles.accessZone}>
          <div className={styles.accessItem}>
            <input
              type="radio"
              id="public"
              name="access"
              className={styles.radioButton}
              defaultChecked
            />
            <label htmlFor="public">
              <div className={styles.labelContent}>
                <Image
                  src={publicIcon}
                  alt="PUBLIC"
                  width={36}
                  height={36}
                  className={styles.icon}
                />
                <div>
                  <strong>Public</strong>
                  <p>해당 컬렉션이 모든 유저에게 노출됩니다.</p>
                </div>
              </div>
            </label>
          </div>

          <div className={styles.accessItem}>
            <input
              type="radio"
              id="private"
              name="access"
              className={styles.radioButton}
            />
            <label htmlFor="private">
              <div className={styles.labelContent}>
                <Image
                  src={privateIcon}
                  alt="PRIVATE"
                  width={36}
                  height={36}
                  className={styles.icon}
                />
                <div>
                  <strong>Private</strong>
                  <p>해당 컬렉션은 나 자신만 볼 수 있습니다.</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </Container>
      <Container title="컬렉션 추가">
        <div className={styles.cancelSaveSection}>
          <Link href="/mypage/newcoll/cancel">취소</Link>
          <Link href="/mypage/newcoll/save">저장 및 추가</Link>
        </div>
      </Container>
    </form>
  );
}
