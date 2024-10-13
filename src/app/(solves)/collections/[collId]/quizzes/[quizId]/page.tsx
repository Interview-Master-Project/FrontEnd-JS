type Props = {
  params: { collId: string; quizId: string };
};

export default function Page({ params }: Props) {
  const { collId, quizId } = params;

  return (
    <div>
      <h1>{collId}</h1>
      <p>{quizId}</p>
    </div>
  );
}
