import dynamic from "next/dynamic";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Profile from "./Profile";
import { TabMenu } from "./TabMenu";
import styles from "./header.module.scss";

const DarkModeToggle = dynamic(
  () => import("@/app/(afterLogin)/_component/header/DarkModeToggle"),
  {
    ssr: false,
    loading: () => (
      <button disabled style={{ width: "10ch", height: "auto" }}>
        dark
      </button>
    ),
  }
);

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
            to="/explore"
            dropdownItems={[
              { label: "컬렉션 검색", mode: "coll" },
              { label: "퀴즈 검색", mode: "quiz" },
            ]}
          >
            질문 리스트
          </TabMenu>
          <TabMenu to="/my">마이페이지</TabMenu>
        </div>
      </div>
      <DarkModeToggle />
      <Profile />
    </header>
  );
}
