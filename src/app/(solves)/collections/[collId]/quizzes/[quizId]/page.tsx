import Header from "@/app/(solves)/_component/header/Header";
import Navigator from "@/app/(solves)/_component/navigator/Navigator";
import SolveZone from "@/app/(solves)/_component/SolveZone";
import Sidebar from "@/app/(solves)/_component/sidebar/Sidebar";
import styles from "./page.module.scss";

type Props = {
  params: { collId: string; quizId: string };
};

export default function Page({ params }: Props) {
  const { collId, quizId } = params;

  return (
    <div className={styles.container}>
      <Header collId={collId} quizId={quizId} />
      <main>
        <Sidebar collId={collId} quizId={quizId} />
        <SolveZone collId={collId} quizId={quizId} />
      </main>
      <Navigator collId={collId} quizId={quizId} />
    </div>
  );
}
