"use client";

import { PropsWithChildren } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import styles from "./tabMenu.module.scss";

interface Props extends PropsWithChildren {
  to: string;
}

export default function TabMenu({ to, children }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      href={to}
      className={clsx(
        styles.tabMenu,
        segment === to.slice(1) && styles.tabFocused // 현재 경로에 속한 경우
      )}
    >
      {children}
    </Link>
  );
}
