"use client";

import styles from "./collAccess.module.scss";
import Image from "next/image";
import publicIcon from "../../../../../public/globe.png";
import privateIcon from "../../../../../public/lock.png";
import { ChangeEvent, useEffect, useState } from "react";

type Props = { id: number };

export default function CollAccess({ id }: Props) {
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setIsPublic(id === "public");
  };

  useEffect(() => {
    if (id <= 5) {
      setIsPublic(false);
    }
  }, [id]);

  return (
    <div className={styles.accessZone}>
      <div className={styles.accessItem}>
        <input
          type="radio"
          id="public"
          name="access"
          className={styles.radioButton}
          onChange={handleChange}
          checked={isPublic}
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
          onChange={handleChange}
          checked={!isPublic}
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
  );
}
