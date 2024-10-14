"use client";

import { useState } from "react";
import clsx from "clsx";
import { FaListUl as ListIcon } from "react-icons/fa";
import { MdHistory as HistoryIcon } from "react-icons/md";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<"list" | "history">("list");

  return (
    <div className={styles.sideBar}>
      <div
        className={clsx({
          [styles.activeBar]: activeTab === "list",
        })}
        onClick={() => setActiveTab("list")}
      >
        <ListIcon />
        <span>목록</span>
      </div>
      <div
        className={clsx({
          [styles.activeBar]: activeTab === "history",
        })}
        onClick={() => setActiveTab("history")}
      >
        <HistoryIcon />
        <span>기록</span>
      </div>
    </div>
  );
}
