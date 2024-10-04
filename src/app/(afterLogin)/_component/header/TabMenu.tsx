"use client";

import { PropsWithChildren, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import styles from "./tabMenu.module.scss";

interface Props extends PropsWithChildren {
  to: string;
  dropdownItems?: { label: string; mode: string }[]; // 드롭다운 메뉴 항목 (있을 수도, 없을 수도 있음)
}

export function TabMenu({ to, children, dropdownItems }: Props) {
  const segment = useSelectedLayoutSegment();
  const [isOpen, setIsOpen] = useState(false);
  const hasDropdown = dropdownItems && dropdownItems.length > 0;

  return (
    <div
      className={styles.tabWrapper}
      onMouseOver={() => hasDropdown && setIsOpen(true)}
      onMouseLeave={() => hasDropdown && setIsOpen(false)}
    >
      <Link
        href={to}
        className={clsx(
          styles.tabMenu,
          segment === to.slice(1) && styles.tabFocused // 현재 경로에 속한 경우
        )}
      >
        {children}
      </Link>
      {/* 드롭다운이 있는 경우에만 표시 */}
      {hasDropdown && (
        <div
          className={clsx(styles.dropdown, {
            [styles.dropdownHidden]: !isOpen,
            [styles.dropdownShow]: isOpen,
          })}
        >
          {dropdownItems.map((item) => (
            <Link
              key={item.mode}
              href={`/home?mode=${item.mode}`}
              className={styles.dropdownItem}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
