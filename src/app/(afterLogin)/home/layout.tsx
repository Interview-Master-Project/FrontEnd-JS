import { CiSearch as SearchIcon } from "react-icons/ci";
import { TextInput } from "@/app/_component/TextInput";
import styles from "./layout.module.scss";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className={styles.searchWall}>
        <form className={styles.searchWindow}>
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
              <TextInput.Button className={styles.searchButton}>
                검색
              </TextInput.Button>
            </TextInput>
            <label htmlFor="categories1">카테고리1</label>
            <input
              id="categories1"
              name="categories1"
              type="checkbox"
              value="카테고리1"
            />
            <label htmlFor="categories2">카테고리2</label>
            <input
              id="categories2"
              name="categories2"
              type="checkbox"
              value="카테고리2"
            />
            <label htmlFor="advanced">고급 질의</label>
            <select name="advanced" id="advanced">
              <option value="정답률 30% 이하만">정답률 30% 이하만</option>
              <option value="정답률 30% 이하만">정답률 50% 이하만</option>
            </select>
          </fieldset>
        </form>
      </div>
      {children}
    </>
  );
}
