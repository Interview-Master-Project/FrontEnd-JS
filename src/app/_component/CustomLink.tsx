"use client";

import Link from "next/link";
import clsx from "clsx";
import styles from "./customLink.module.scss";

type Props = {
  to: string;
  color?: "base" | "green" | "red";
  variant?: "contained" | "outlined";
  classname?: string;
  children: React.ReactNode;
};

// 스타일 적용된 Link 컴포넌트
/**
 * to: 목적지(href)
 * color: 색상 변수
 * variant: 버튼 스타일
 * classname: 부가적인 스타일
 * children: 내부 컨텐츠
 */
export default function CustomLink({
  to,
  color = "base",
  variant = "contained",
  classname,
  children: label,
}: Props) {
  let customStyle = `${variant}_${color}`;

  return (
    <Link
      href={to}
      className={clsx(styles.link, styles[customStyle], classname)}
    >
      {label}
    </Link>
  );
}
