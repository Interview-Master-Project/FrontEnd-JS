import Search from "./_component/search/Search";
import styles from "./layout.module.scss";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className={styles.searchWall}>
        <Search />
        {/* <Filters /> */}
      </div>
      {children}
    </>
  );
}
