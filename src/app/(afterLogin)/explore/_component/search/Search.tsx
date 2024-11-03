"use client";

import { usePathname } from "next/navigation";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/textInput/TextInput";
import FilterBox from "./FilterBox";
import FilterResult from "./FilterResult";
import styles from "./search.module.scss";

export default function Search() {
  const pathname = usePathname();

  let label = "";
  let placeholder = "";

  if (pathname === "/explore/quiz") {
    label = "퀴즈 검색";
    placeholder = "검색어 입력 (퀴즈 제목으로 검색할 수 있어요)";
  } else {
    label = "컬렉션 검색";
    placeholder =
      "검색어 입력 (컬렉션 이름이나 컬렉션 설명으로 검색할 수 있어요)";
  }

  return (
    <div className={styles.searchZone}>
      <h3>{label}</h3>
      <TextInput>
        <TextInput.Icon>
          <SearchIcon />
        </TextInput.Icon>
        <TextInput.Input placeholder={placeholder} />
      </TextInput>
      <FilterBox />
      <FilterResult />
    </div>
  );
}
