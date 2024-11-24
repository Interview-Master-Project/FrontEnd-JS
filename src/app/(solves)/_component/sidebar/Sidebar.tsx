"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSwitchStore } from "@/store/useSwitchStore";
import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";
import { motion } from "framer-motion";
import { Tab } from "./Tab";
import List from "./List";
import History from "./History";
import { IoMdClose as CloseIcon } from "react-icons/io";
import clsx from "clsx";
import styles from "./sidebar.module.scss";

type Props = {
  data: GetQuizzesWithAttemptByCollectionIdQuery;
};

export type TabType = "목록" | "기록";

export default function Sidebar({ data }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState<TabType>("목록");

  const { isOpen, close } = useSwitchStore();

  const handleClickTab = (indicator: TabType) => {
    setTab(indicator);
  };

  const quizzes = data.getQuizzesWithAttemptByCollectionId;

  const handleClickList = (moveIdx: number) => {
    const navigateQuizId =
      data?.getQuizzesWithAttemptByCollectionId[moveIdx]?.quiz?.id;

    const newPath = pathname.replace(/\/(\d+)$/, `/${navigateQuizId}`);
    router.push(newPath);
  };

  return (
    <motion.div
      initial={!isOpen && { width: 0, visibility: "hidden" }}
      animate={{
        width: isOpen ? 320 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
      transition={{ type: "tween", duration: 0.3, stiffness: 200 }}
      className={clsx(styles.sidebar, {
        [styles.sidebar__collapse]: !isOpen,
      })}
    >
      <div className={styles.innerWrapper}>
        <div className={styles.interactionsWrapper}>
          <Tab tab={tab}>
            <Tab.Menu
              active={tab === "목록"}
              onSwitch={handleClickTab}
              name="목록"
            />
            <Tab.Menu
              active={tab === "기록"}
              onSwitch={handleClickTab}
              name="기록"
            />
          </Tab>
          <CloseIcon
            role="button"
            onClick={close}
            className={styles.closeBtn}
          />
        </div>
        {tab === "목록" && (
          <List quizzes={quizzes} onClickList={handleClickList} />
        )}
        {tab === "기록" && <History data={data} />}
      </div>
    </motion.div>
  );
}
