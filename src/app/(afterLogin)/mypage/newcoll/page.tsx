"use client";

import styles from "./page.module.scss";
import Container from "../../_component/Container";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import clsx from "clsx";

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  // const submit = (event: FormEvent) => {
  //   // Form 제출 시 로직
  //   event.preventDefault();
  // };

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
          <div>
            <input type="checkbox" />
            <span>Public</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Private</span>
          </div>
        </div>
      </Container>
    </form>
  );
}
