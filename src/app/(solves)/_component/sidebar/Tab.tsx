"use client";

import type { TabType } from "./Sidebar";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./tab.module.scss";

interface TabContainerProps {
  tab: TabType;
  children: ReactNode;
}

function TabContainer({ tab, children }: TabContainerProps) {
  return (
    <div className={styles.interactionTab}>
      {children}
      <motion.div
        className={styles.tabIndicator}
        layout
        transition={{ type: "tween", stiffness: 300, damping: 20 }}
        initial={false}
        animate={{
          x: tab === "목록" ? 0 : "100%", // 탭 위치에 따라 이동
        }}
      />
    </div>
  );
}

interface MenuProps {
  active: boolean;
  onSwitch: (indiactor: TabType) => void;
  name: TabType;
}

function Menu({ active, onSwitch, name }: MenuProps) {
  return (
    <div
      className={clsx(styles.tab, {
        [styles.tab__active]: active,
      })}
      onClick={() => onSwitch(name)}
    >
      {name}
    </div>
  );
}

export const Tab = Object.assign(TabContainer, {
  Menu,
});
