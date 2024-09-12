import styles from "@/app/(afterLogin)/mypage/page.module.scss";
import Container from "../../_component/Container";

export default function Page() {
  return (
    <>
      <Container title="컬렉션 제목">설정</Container>
      <Container title="상세 설명">
        <textarea
          name="description"
          id="description"
          className={styles.description}
          placeholder="컬렉션의 상세 설명을 적어주세요."
        ></textarea>
      </Container>
    </>
  );
}
