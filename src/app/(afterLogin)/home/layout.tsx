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
                placeholder="검색어를 입력하세요."
              />
              <TextInput.Button type="submit">검색</TextInput.Button>
            </TextInput>
            <FilterBox></FilterBox>
          </fieldset>
        </form>
      </div>
      <div>
        <div className={styles.contentsHeader}>
          <div>
            <span>필터</span>
            <div>필터1</div>
            <div>필터2</div>
          </div>
          <div className={styles.rightHeaderSection}>
            <CardSwitchIcon />
            <ListSwitchIcon />
            <div>드롭다운</div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
