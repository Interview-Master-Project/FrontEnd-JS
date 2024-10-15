"use client";

import clsx from "clsx";
import styles from "./tab.module.scss";

type Props = {
  children: React.ReactNode;
  isActive: boolean; // 활성화된 탭인지 여부
  onClick: () => void; // 상태 변경 trigger
};

export default function Tab({ children, isActive, onClick }: Props) {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
