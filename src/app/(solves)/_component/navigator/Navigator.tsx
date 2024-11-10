import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./navigator.module.scss";

type Props = {
  collId: string;
  quizId: string;
};

export default function Navigator({ collId, quizId }: Props) {
  return (
    <nav className={styles.navigatorWrapper}>
      <div style={{ visibility: "hidden" }}></div>
      <div className={styles.navigation}>
        <OutlinedButton variant="gray">이전</OutlinedButton>
        <strong>4 / 10</strong>
        <ContainedButton>다음</ContainedButton>
      </div>
      <div className={styles.decision}>
        <OutlinedButton variant="red">나가기</OutlinedButton>
      </div>
    </nav>
  );
}
