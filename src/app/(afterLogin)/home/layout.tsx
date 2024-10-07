import ResultHeader from "./_component/ResultHeader";
import styles from "./layout.module.scss";
import SearchForm from "./_component/SearchForm";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className={styles.searchWall}>
        <SearchForm />
      </div>
      <div className={styles.resultHeader}>
        <ResultHeader />
      </div>
      {children}
    </>
  );
}
