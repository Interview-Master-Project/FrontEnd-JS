import InfoModal from "@/app/_component/InfoModal";
import styles from "@/app/_component/infoModal.module.scss";
import Link from "next/link";

export default function Page() {
  return (
    <InfoModal title="로그아웃하시겠습니까?">
      <Link href="/" className={styles.actionBtn__warning}>
        확인
      </Link>
    </InfoModal>
  );
}
