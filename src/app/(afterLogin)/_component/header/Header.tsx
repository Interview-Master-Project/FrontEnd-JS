import styles from "./header.module.scss";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Profile from "./Profile";
import { Tab } from "./Tab";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <h3>Logo</h3>
        </div>
        {/* <TabMenu>
          <Link
            href="/home"
            className={clsx(
              styles.tab,
              segment === "home" && styles.tabFocused
            )}
          >
            질문 리스트
          </Link>
          <Link
            href="/mypage"
            className={clsx(
              styles.tab,
              segment === "mypage" && styles.tabFocused
            )}
          >
            마이 페이지
          </Link>
        </TabMenu> */}
        <Tab>
          <Tab.Menu to="/home">질문 리스트</Tab.Menu>
          <Tab.Menu to="/mypage">마이페이지</Tab.Menu>
        </Tab>
      </div>
      <Profile />
    </header>
  );
}
