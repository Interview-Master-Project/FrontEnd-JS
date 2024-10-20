// import SearchForm from "./_component/SearchForm";
// import ResultHeader from "./_component/ResultHeader";
import Search from "./_component/search/Search";
import styles from "./layout.module.scss";

// export default function Layout({ children }: React.PropsWithChildren) {
//   return (
//     <>
//       <div className={styles.searchWall}>
//         <SearchForm />
//       </div>
//       <div className={styles.resultHeader}>
//         <ResultHeader />
//       </div>
//       {children}
//     </>
//   );
// }

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className={styles.searchWall}>
        <Search />
      </div>
      {children}
    </>
  );
}
