import InfoModal from "@/app/_component/InfoModal";
import styles from "@/app/_component/infoModal.module.scss";
import Link from "next/link";

export default function Page() {
  return (
    <InfoModal title="이 컬렉션을 삭제하시겠습니까?">
      <Link href="/mypage" className={styles.actionBtn__warning}>
        삭제
      </Link>
    </InfoModal>
  );
}
