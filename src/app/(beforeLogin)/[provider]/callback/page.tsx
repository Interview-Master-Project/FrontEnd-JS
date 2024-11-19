import Callback from "@/app/(beforeLogin)/_component/Callback";

type Props = {
  params: { provider: string };
  searchParams: any;
};

export default function Page({ params, searchParams }: Props) {
  const { provider } = params;
  const code = searchParams.code;
  const state = searchParams.state;

  return <Callback provider={provider} code={code} state={state} />;
}
