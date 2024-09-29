"use client";

import { PropsWithChildren } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import styles from "./tab.module.scss";

// Tab 최외각 div
function TabWrapper({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}

interface MenuProps extends PropsWithChildren {
  to: string;
  classname?: string;
  children: string;
}

// Tab 메뉴
function TabMenu({ to, classname, children: label }: MenuProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link href={to} className={classname}>
      {label}
    </Link>
  );
}

export const Tab = Object.assign(TabWrapper, {
  Menu: TabMenu,
});

// 추가 사항
// 메뉴1 => "질문 리스트", 홈으로 가야하고, 현재 탭이 홈이면 focus style
// 메뉴2 => "마이 페이지", 마이페이지로 가야하고, 현재 탭이 mypage 및 하위 url이면 focus style

// usage
// <Tab>
//   <Tab.Menu>메뉴1</Tab.Menu>
//   <Tab.Menu>메뉴2</Tab.Menu>
// </Tab>
