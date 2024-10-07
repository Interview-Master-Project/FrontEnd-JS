"use client";

import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/TextInput";
import FilterBox, { ICategories } from "./FilterBox";
import { TCategories, useSearchStore } from "@/store/useSearchStore";
import { FormEventHandler } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "@/graphql/query";
import styles from "../layout.module.scss";

export default function SearchForm() {
  const { changeKeywords, changeCategories } = useSearchStore();
  const { data } = useQuery<ICategories>(ALL_CATEGORIES);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const categoriesId = formData.getAll("categoriesId") as string[];
    const categoriesIdConverted = categoriesId.map((value) => +value);

    console.log("categoriesIdConverted: ", categoriesIdConverted);
    console.log("data?.getAllCategories: ", data?.getAllCategories);

    // data.getAllCategories에서 선택된 카테고리 ID와 일치하는 카테고리 객체를 찾음
    const categories = categoriesIdConverted
      .map((checkedId) =>
        data?.getAllCategories.find(({ id }) => +id === checkedId)
      )
      .filter((category) => category !== undefined); // undefined 제거

    console.log("categories: ", categories);

    changeKeywords(search);
    changeCategories(categories);
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
