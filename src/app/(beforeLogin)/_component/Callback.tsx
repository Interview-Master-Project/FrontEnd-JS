import Auth2Redirect from "@/app/(beforeLogin)/_component/Auth2Redirect";

type Props = { provider: string };

export default async function Callback({ provider }: Props) {
  return (
    <div>
      <p>로그인 진행중입니다... 잠시 기다려주세요!</p>
      <Auth2Redirect provider={provider} />
    </div>
  );
}
