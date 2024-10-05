import { CiSearch as SearchIcon } from "react-icons/ci";
import { HiOutlineSquares2X2 as CardSwitchIcon } from "react-icons/hi2";
import { HiMenu as ListSwitchIcon } from "react-icons/hi";
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
                placeholder="검색어 입력 (컬렉션 이름이나 컬렉션 설명으로 검색할 수 있어요)"
              />
              <TextInput.Button type="submit">검색</TextInput.Button>
            </TextInput>
            <FilterBox />
          </fieldset>
        </form>
      </div>
      <div className={styles.resultWall}>
        <div className={styles.contentsHeader}>
          <div className={styles.headerSection}>
            <span>필터</span>
            <div>필터1 X</div>
            <div>필터2 X</div>
          </div>
          <div className={styles.headerSection}>
            <CardSwitchIcon />
            <ListSwitchIcon />
            <div>최신순</div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
