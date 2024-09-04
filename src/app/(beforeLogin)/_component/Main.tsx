import styles from "./main.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function Main() {
  return (
    <>
      <div className={styles.left}>
        <Image src={logo} alt="로고" width={300} height={300} priority={true} />
      </div>
      <div className={styles.right}>
        <h1>두려운 면접 질문.</h1>
        <h2>걱정은 그만, 여기서 시작.</h2>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}
