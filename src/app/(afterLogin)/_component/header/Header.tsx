import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Profile from "./Profile";
import { TabMenu } from "./TabMenu";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <h3>Logo</h3>
        </div>
        <div className={styles.tab}>
          <TabMenu
            to="/home"
            dropdownItems={[
              { label: "컬렉션 검색", mode: "coll" },
              { label: "퀴즈 검색", mode: "quiz" },
            ]}
          >
            질문 리스트
          </TabMenu>
          <TabMenu to="/mypage">마이페이지</TabMenu>
        </div>
      </div>
      <Profile />
    </header>
  );
}
