import Auth2Redirect from "@/app/(beforeLogin)/_component/Auth2Redirect";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./callback.module.scss";

type Props = {
  provider: string;
  code: string;
  state: string | null;
};

export default async function Callback({ provider, code, state }: Props) {
  return (
    <div className={styles.callback}>
      <div className={styles.spinnerContainer}>
        <LoadingSpinner />
        <p>로그인 중입니다...</p>
      </div>
      <Auth2Redirect provider={provider} code={code} state={state} />
    </div>
  );
}
