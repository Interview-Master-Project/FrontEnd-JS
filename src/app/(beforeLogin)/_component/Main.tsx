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
        <div className={styles.rightFooter}>
          <div>
            <p>10초 만에 소셜 계정 로그인하기</p>
            <Link href="/login" className={styles.baseLink}>
              로그인
            </Link>
          </div>
          <div className={styles.divider}></div> {/* 구분선 */}
          <div>
            <p>어떤 질문이 올라왔는 지 확인해보세요.</p>
            <Link href="/home" className={styles.baseLink}>
              둘러보기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
