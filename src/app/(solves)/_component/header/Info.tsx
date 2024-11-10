"use client";

import { useSwitchStore } from "@/store/useSwitchStore";
import { IoMenu } from "react-icons/io5";
import { MdChevronRight as RightIcon } from "react-icons/md";
import styles from "./info.module.scss";

type Props = {
  targetQuiz?: any;
};

export default function Info({ targetQuiz }: Props) {
  const { toggle } = useSwitchStore();

  return (
    <div className={styles.infoContainer}>
      <div>
        <IoMenu className={styles.menuIcon} onClick={toggle} />
        <h3>{targetQuiz?.collection.name}</h3>
        <RightIcon className={styles.rightIcon} />
        <h3>{targetQuiz?.question}</h3>
        <h5>{targetQuiz?.collection.category.name}</h5>
      </div>
    </div>
  );
}
