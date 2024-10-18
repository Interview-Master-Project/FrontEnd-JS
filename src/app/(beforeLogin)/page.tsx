import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import ContainedButton from "../_component/button/ContainedButton";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.left}>
        <Image src={logo} alt="로고" width={240} height={240} />
      </div>
      <div className={styles.right}>
        <div>
          <h1>두려운 면접 질문.</h1>
          <h2>걱정은 그만, 여기서 시작.</h2>
        </div>
        <div className={styles.rightFooter}>
          <div>
            <p>10초 만에 소셜 계정 로그인하기</p>
            <Link href="/login">
              <ContainedButton>로그인</ContainedButton>
            </Link>
          </div>
          <div>
            <p>어떤 질문이 올라왔는 지 확인해보세요.</p>
            <Link href="/login">
              <ContainedButton>둘러보기</ContainedButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
