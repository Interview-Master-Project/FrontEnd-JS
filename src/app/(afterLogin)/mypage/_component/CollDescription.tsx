"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./collDescription.module.scss";
import TextAreaAutoSize from "react-textarea-autosize";

type Props = { id: number };

export default function CollDescription({ id }: Props) {
  useEffect(() => {
    if (id === 1) {
      setDescription(
        "백엔드 필수 언어인 Java 언어에 대한 면접 질문을 풀어봅시다."
      );
    }
  }, [id]);

  const [description, setDescription] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <TextAreaAutoSize
      id="description"
      name="description"
      className={styles.description}
      value={description ?? ""}
      onChange={handleChange}
      placeholder="컬렉션의 상세 설명을 적어주세요."
    ></TextAreaAutoSize>
  );
}
