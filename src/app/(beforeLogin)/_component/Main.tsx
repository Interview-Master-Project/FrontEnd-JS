import styles from "./main.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function Main() {
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
        <div>
          <h3>소셜 계정으로 간편하게 로그인하세요!</h3>
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        </div>
      </div>
    </>
  );
}
