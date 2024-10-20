"use client";

import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/TextInput";
import styles from "./search.module.scss";

//

export default function Search() {
  return (
    <div className={styles.searchZone}>
      <h3>컬렉션 검색</h3>
      <TextInput className={styles.searchInput}>
        <TextInput.Icon>
          <SearchIcon />
        </TextInput.Icon>
        <TextInput.Input
          name="search"
          placeholder="검색어 입력 (컬렉션 이름이나 컬렉션 설명으로 검색할 수 있어요)"
        />
        <TextInput.Button type="submit">검색</TextInput.Button>
      </TextInput>
      {/* <Filters>
        <Filters.Filter>
          
        </Filters.Filter>
      </Filters> */}
    </div>
  );
}
