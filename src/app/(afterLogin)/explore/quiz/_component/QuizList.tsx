"use client";

import { useClientFetch } from "@/hooks/useClientFetch";
import { SEARCH_QUIZZES, IData } from "@/graphql/query/search-quizzes";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import { useSearchParams } from "next/navigation";
import { List } from "./List";
import Navigator from "../../_component/Navigator";
import styles from "./quizList.module.scss";
import { useEffect } from "react";

type Props = {
  initialData: IData;
};

export default function QuizList({ initialData }: Props) {
  const { keywords, categories, maxCorrectRate } = useSearchFilterStore();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "LATEST";
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const { data, loading, error, refetch } = useClientFetch<IData>(
    SEARCH_QUIZZES,
    {
      variables: {
        keywords,
        categoryIds: categories.map((ct) => +ct),
        maxCorrectRate,
        sort,
        offset,
      },
    },
    true
  );

  useEffect(() => {
    refetch({ keywords, categories, maxCorrectRate });
  }, [keywords, categories, maxCorrectRate, refetch]);

  const quizzes = data?.searchQuizzes ?? initialData.searchQuizzes;

  console.log("키워드", keywords);
  console.log(
    "카테고리",
    categories.map((ct) => +ct)
  );
  console.log("정답률", maxCorrectRate);

  return (
    <div className={styles.listWrapper}>
      <div className={styles.lists}>
        {quizzes.quizzesWithAttempt.map(({ quiz }) => (
          <List key={quiz.id} id={quiz.collection.id}>
            <List.Question>{quiz.question}</List.Question>
            <List.CollectionInfo
              name={quiz.collection.name}
              imgUrl={quiz.collection.imgUrl}
              access={quiz.collection.access}
            />
          </List>
        ))}
      </div>
      <Navigator
        currentPage={quizzes.pageInfo.currentPage}
        hasNextPage={quizzes.pageInfo.hasNextPage}
        totalPages={quizzes.pageInfo.totalPages}
      />
    </div>
  );
}
