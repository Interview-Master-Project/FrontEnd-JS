"use client";

type Props = { initialOffset: number };

import { useClientFetch } from "@/hooks/useClientFetch";
import { SEARCH_COLLECTIONS, IData } from "@/graphql/query/search-collections";
import { useSearchStore, ISearchStore } from "@/store/useSearchStore";

export default function Navigator({ initialOffset }: Props) {
  const { keywords, sort, categories, maxCorrectRate }: ISearchStore =
    useSearchStore();
  const categoryIds = categories.map(({ id }) => +id); // id만 추출, number로 명시적 타입 변경
  const variables = {
    keywords,
    sort,
    categories: categoryIds,
    maxCorrectRate, // maxCorrectRate가 undefined라면 제외됨
    offset: initialOffset,
  };

  const { data, loading, error } = useClientFetch<IData>(
    SEARCH_COLLECTIONS,
    {
      variables,
    },
    true
  );

  return (
    <div>
      {data?.searchCollections.collectionsWithAttempt.map((item) => (
        <div key={item.collection.id}>{item.collection.name}</div>
      ))}
    </div>
  );
}
