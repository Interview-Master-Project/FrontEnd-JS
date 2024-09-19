"use client";

import InfoModal from "@/app/_component/InfoModal";
import styles from "@/app/_component/infoModal.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <InfoModal title="이 컬렉션을 추가하시겠습니까?">
      <button onClick={onClickClose} className={styles.actionBtn__warning}>
        취소
      </button>
      <Link href="/mypage" className={styles.actionBtn__ok}>
        저장
      </Link>
    </InfoModal>
  );
}
