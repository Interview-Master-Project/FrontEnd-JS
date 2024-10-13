"use client";

import styles from "./collImgTitle.module.scss";
import { useState, useRef, ChangeEvent, MouseEvent, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

// props로 id를 전송받는다
// id가 기존에 없던 것이라면 생성 페이지 (default 값으로)
// id가 기존에 있던 것이라면 수정 페이지 (서버로부터 데이터 받아와서 data fetch)
// 일단 테스트용으로 id를 1로 넘기면 기본값
// id를 2로 넘기면 data fetch

type Props = { id: number };

export default function CollImgTitle({ id }: Props) {
  const [previewImage, setPreviewImage] =
    useState<string>("/default_image.png");
  const imageRef = useRef<HTMLInputElement>(null);
  const [enteredTitle, setEnteredTitle] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState<boolean | null>(null);

  useEffect(() => {
    if (id <= 5) {
      setPreviewImage("/logo.png");
      setEnteredTitle("Java 객체지향 면접 질문");
    }
  }, [id]);

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
  const handleResetImage = (event: MouseEvent) => {
    event.preventDefault();
    setPreviewImage("/default_image.png");
  };

  return (
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
  );
}
