"use client";

import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/textInput/TextInput";
import FilterBox from "../FilterBox";
import styles from "./search.module.scss";

export default function Search() {
  return (
    <div className={styles.searchZone}>
      <h3>컬렉션 검색</h3>
      <TextInput>
        <TextInput.Icon>
          <SearchIcon />
        </TextInput.Icon>
        <TextInput.Input placeholder="검색어 입력 (컬렉션 이름이나 컬렉션 설명으로 검색할 수 있어요)" />
      </TextInput>
      <FilterBox />
      {/* (C) <Selects /> */}
    </div>
  );
}
