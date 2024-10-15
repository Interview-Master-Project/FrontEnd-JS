"use client";

import { useState } from "react";
import Tab from "./Tab";
import { FaListUl as ListIcon } from "react-icons/fa";
import { MdHistory as HistoryIcon } from "react-icons/md";
import List from "./List";
import History from "./History";
import { IData } from "@/graphql/query/get-quizzes-by-collection-id";
import styles from "./sidebar.module.scss";

export default function Sidebar({ data }: { data: IData }) {
  const [view, setView] = useState<"list" | "history">("list");

  return (
    <div className={styles.sideBar}>
      <Tab isActive={view === "list"} onClick={() => setView("list")}>
        <ListIcon />
        <span>목록</span>
      </Tab>
      <Tab isActive={view === "history"} onClick={() => setView("history")}>
        <HistoryIcon />
        <span>기록</span>
      </Tab>
      {view === "list" && <List />}
      {view === "history" && <History />}
    </div>
  );
}
