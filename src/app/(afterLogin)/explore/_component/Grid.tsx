"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import {
  IData as IALData,
  SEARCH_COLLECTIONS_FOR_AUTH_USER,
} from "@/graphql/query/search-collections-for-auth-user";
import {
  IData as IBLData,
  SEARCH_COLLECTIONS_FOR_GUEST,
} from "@/graphql/query/search-collections-for-guest";
import { useClientFetch } from "@/hooks/useClientFetch";
import { useSearchGridStore } from "@/store/useSearchGridStore";
import { Card } from "../../_component/collections/Card";
import { List } from "../../_component/collections/List";
import Navigator from "./Navigator";
import { calculateCorrectRate } from "../_lib/calculateCorrectRate";
import clsx from "clsx";
import styles from "../page.module.scss";

type DataType = IALData | IBLData;

type Props = {
  initialData: IALData | IBLData;
  isLoggedIn: boolean;
};

export default function Grid({ initialData, isLoggedIn }: Props) {
  const { selectedSearchGrid } = useSearchGridStore(); // 보기형식 === Card | List
  const { keywords, categories, maxCorrectRate } = useSearchFilterStore();

  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "LATEST";
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const query = isLoggedIn
    ? SEARCH_COLLECTIONS_FOR_AUTH_USER
    : SEARCH_COLLECTIONS_FOR_GUEST;
  const variables = isLoggedIn
    ? {
        keywords,
        categoryIds: categories.map((ct) => +ct),
        maxCorrectRate,
        sort,
        offset,
      }
    : { keywords, categoryIds: categories.map((ct) => +ct), offset };
  const { data, loading, error, refetch } = useClientFetch<DataType>(
    query,
    {
      variables,
    },
    isLoggedIn
  );

  useEffect(() => {
    refetch({ keywords, categories, maxCorrectRate });
  }, [keywords, categories, maxCorrectRate, refetch]);

  useEffect(() => {
    refetch({ sort, offset });
  }, [sort, offset, refetch]);

  const collections = isLoggedIn
    ? (data as IALData)?.searchCollectionsForAuthUser ??
      (initialData as IALData).searchCollectionsForAuthUser
    : (data as IBLData)?.searchCollectionsForGuest ??
      (initialData as IBLData).searchCollectionsForGuest;

  return (
    <div className={styles.gridWrapper}>
      <div
        className={clsx(styles.main, {
          [styles.main_card]: selectedSearchGrid === "card",
          [styles.main_list]: selectedSearchGrid === "list",
        })}
      >
        {collections.collectionsWithAttempt?.map(
          ({
            collection,
            quizCount, // 문제 수
            ...rest
          }) => {
            const { recentRate, totalRate } = calculateCorrectRate(rest);

            if (selectedSearchGrid === "card") {
              return (
                <Card
                  key={collection.id}
                  id={collection.id}
                  className={styles.card}
                >
                  <Card.Access access={collection.access} />
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={collection.imgUrl as string}
                      alt={collection.id}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <Card.Title>{collection.name}</Card.Title>
                    <Card.Description>
                      {collection.description}
                    </Card.Description>
                  </div>
                  <Card.Info className={styles.cardInfo}>
                    <span>
                      <strong>{quizCount}</strong> 문제
                    </span>
                    <span>
                      최근정답률 <strong>{recentRate ?? "-"}</strong>%
                    </span>
                    <span>
                      총합정답률 <strong>{totalRate ?? "-"}</strong>%
                    </span>
                    <span>{collection.category.name}</span>
                  </Card.Info>
                </Card>
              );
            } else if (selectedSearchGrid === "list") {
              return (
                <List
                  key={collection.id}
                  id={collection.id}
                  className={styles.list}
                >
                  <List.Access access={collection.access} />
                  <div className={styles.listImageWrapper}>
                    <Image
                      src={collection.imgUrl as string}
                      alt={collection.id}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                  <div className={styles.listContent}>
                    <List.Title>{collection.name}</List.Title>
                    <List.Description>
                      {collection.description}
                    </List.Description>
                  </div>
                  <Card.Info className={styles.listInfo}>
                    <span>
                      <strong>{quizCount}</strong> 문제
                    </span>
                    <span>
                      최근정답률 <strong>{recentRate ?? "-"}</strong>%
                    </span>
                    <span>
                      총합정답률 <strong>{totalRate ?? "-"}</strong>%
                    </span>
                    <span>{collection.category.name}</span>
                  </Card.Info>
                </List>
              );
            }
          }
        )}
      </div>
      <Navigator
        currentPage={collections.pageInfo.currentPage}
        hasNextPage={collections.pageInfo.hasNextPage}
        totalPages={collections.pageInfo.totalPages}
      />
    </div>
  );
}
