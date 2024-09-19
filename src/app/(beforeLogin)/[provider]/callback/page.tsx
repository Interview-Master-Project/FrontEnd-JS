import Callback from "@/app/(beforeLogin)/_component/Callback";

type Props = { params: { provider: string } };

export default function Page({ params }: Props) {
  return <Callback provider={params.provider} />;
}
