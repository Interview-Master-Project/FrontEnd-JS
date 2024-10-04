import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/TextInput";
import FilterBox from "./_component/FilterBox";
import styles from "./layout.module.scss";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className={styles.searchWall}>
        <form>
          <fieldset className={styles.searchZone}>
            <legend>컬렉션 검색</legend>
            <TextInput className={styles.searchInput}>
              <TextInput.Icon>
                <SearchIcon />
              </TextInput.Icon>
              <TextInput.Input
                name="search"
                placeholder="검색어를 입력하세요."
              />
              <TextInput.Button type="submit">검색</TextInput.Button>
            </TextInput>
            <FilterBox></FilterBox>
          </fieldset>
        </form>
      </div>
      {children}
    </>
  );
}
