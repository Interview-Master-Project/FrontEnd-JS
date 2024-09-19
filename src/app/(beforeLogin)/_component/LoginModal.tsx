import styles from "./loginModal.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import kakaoLoginLogo from "../../../../public/kakao_login_large_wide.png";
import naverLoginLogo from "../../../../public/btnG_naver.png";
import BackButton from "./BackButton";

export default function LoginModal() {
  // naver required parameters
  const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const naverRedirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const state = "interview-quiz";

  // kakao required parameters
  const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  // redirect URL
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
  const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&response_type=code&state=${state}`;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <BackButton />
          <Image src={logo} alt="로고" className={styles.logo} />
          <h1>로그인</h1>
          <p>소셜 계정으로 간편 로그인하세요!</p>
        </div>
        <div className={styles.modalBody}>
          <Link href={NAVER_URL}>
            <Image src={naverLoginLogo} alt="네이버 로그인" />
          </Link>
          <Link href={KAKAO_URL}>
            <Image src={kakaoLoginLogo} alt="카카오 로그인" />
          </Link>
        </div>
      </div>
    </div>
  );
}
