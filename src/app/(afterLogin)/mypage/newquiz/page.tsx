import styles from "@/app/(afterLogin)/mypage/page.module.scss";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>새 질문 추가</div>
      <div className={styles.wrapper}>컨텐츠 영역</div>
    </main>
  );
}
