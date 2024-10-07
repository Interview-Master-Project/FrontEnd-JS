"use client";

import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/TextInput";
import FilterBox from "./FilterBox";
import { useSearchStore } from "@/store/useSearchStore";
import { FormEventHandler } from "react";
import styles from "../layout.module.scss";

export default function SearchForm() {
  const { changeSearch } = useSearchStore();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    console.log("handleSubmit: ", search);

    changeSearch(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={styles.searchZone}>
        <legend>컬렉션 검색</legend>
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
        <FilterBox />
      </fieldset>
    </form>
  );
}
