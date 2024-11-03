import { fetchQueryData } from "@/utils/fetchQueryData";
import { SEARCH_QUIZZES, IData } from "@/graphql/query/search-quizzes";
import ShowSelect from "./_component/ShowSelect";
import QuizList from "./_component/QuizList";

type Props = {
  searchParams: { [key: string]: string };
};

export default async function Page({ searchParams }: Props) {
  const { data: initialData } = await fetchQueryData<IData>({
    query: SEARCH_QUIZZES,
    variables: {
      keywords: [],
      offset: 0,
      sort: searchParams.sort || "LATEST",
      categoryIds: [],
    },
    requiresAuth: true,
  });

  if (!initialData) return <p>퀴즈 정보를 불러오는 데 실패했습니다.</p>;

  return (
    <>
      <ShowSelect />
      <QuizList initialData={initialData} />
    </>
  );
}
