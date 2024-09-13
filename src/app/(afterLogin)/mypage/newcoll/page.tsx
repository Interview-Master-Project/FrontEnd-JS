"use client";

import styles from "./page.module.scss";
import Container from "../../_component/Container";
import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import publicIcon from "../../../../../public/globe.png";
import privateIcon from "../../../../../public/lock.png";

export default function Page() {
  const [image, setImage] = useState<string>("/default_image.png");
  const imageRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    imageRef?.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file); // 파일 url 생성
      setImage(imageUrl);
    }
  };

  return (
    <form className={styles.form}>
      <Container title="컬렉션 제목">
        <div className={styles.infoColl}>
          <label htmlFor="image">
            <div className={styles.imagePreview} onClick={handleInputClick}>
              <img
                src={image}
                alt="미리보기"
                className={!image ? styles.initImg : styles.attachImg}
              />
            </div>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={imageRef}
          />
          <input
            id="title"
            name="title"
            type="text"
            className={styles.titleInput}
            placeholder="컬렉션 제목을 적어주세요"
          />
        </div>
      </Container>
      <Container title="상세 설명">
        <textarea
          id="description"
          name="description"
          className={styles.description}
          placeholder="컬렉션의 상세 설명을 적어주세요."
        ></textarea>
      </Container>
      <Container title="공개 범위 여부">
        <div className={styles.accessZone}>
          <div className={styles.accessItem}>
            <input
              type="radio"
              id="access"
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
        <Link href="/mypage/newcoll/cancel">취소</Link>
        <button>저장 및 추가</button>
      </Container>
    </form>
  );
}
