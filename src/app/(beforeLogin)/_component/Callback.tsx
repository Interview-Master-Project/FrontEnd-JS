import Auth2Redirect from "@/app/(beforeLogin)/_component/Auth2Redirect";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./callback.module.scss";

type Props = { provider: string };

export default async function Callback({ provider }: Props) {
  return (
    <div className={styles.callback}>
      <div className={styles.spinnerContainer}>
        <LoadingSpinner />
        <p>로그인 중입니다...</p>
      </div>
      <Auth2Redirect provider={provider} />
    </div>
  );
}
