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
    <InfoModal
      title="저장되지 않은 변경사항이 있습니다."
      subtitle="변경하지 않은 채로 나가시겠습니까?"
      description="작성한 사항은 모두 삭제됩니다."
    >
      <button className={styles.actionBtn__warning} onClick={onClickClose}>
        취소
      </button>
      <Link href="/my" className={styles.actionBtn__ok}>
        나가기
      </Link>
    </InfoModal>
  );
}
