import Link from "next/link";
import ContainedButton from "@/app/_component/button/ContainedButton";

type Props = {
  collId: string;
};

export default function NoQuizzes({ collId }: Props) {
  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
      }}
    >
      <h1>등록된 퀴즈가 없습니다.</h1>
      <ContainedButton>
        <Link href={`/details/collections/${collId}`}>퀴즈 추가</Link>
      </ContainedButton>
    </div>
  );
}
