import InfoModal from "@/app/_component/InfoModal";
import styles from "@/app/_component/infoModal.module.scss";
import Link from "next/link";

export default function Page() {
  return (
    <InfoModal
      title="정말로 회원탈퇴하시겠습니까?"
      description={
        <span style={{ color: "red" }}>
          주의! 지금까지 작성하신 질문 리스트 및 기록이
          <br />
          전부 삭제되며 이는 복구할 수 없습니다.
        </span>
      }
    >
      <Link href="/" className={styles.actionBtn__warning}>
        주의사항을 확인했으며, 회원 탈퇴를 희망합니다.
      </Link>
    </InfoModal>
  );
}
