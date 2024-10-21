"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import { IData, SEARCH_COLLECTIONS } from "@/graphql/query/search-collections";
import { useClientFetch } from "@/hooks/useClientFetch";
import { useSearchGridStore } from "@/store/useSearchGridStore";
import { Card } from "../../_component/collections/Card";
import { List } from "../../_component/collections/List";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { calculateCorrectRate } from "../_lib/calculateCorrectRate";
import clsx from "clsx";
import styles from "../page.module.scss";

export default function Grid({ initialData }: { initialData: IData }) {
  const { selectedSearchGrid } = useSearchGridStore(); // 보기형식 === Card | List

  const { filters } = useSearchFilterStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  const sort = searchParams.get("sort") || "LATEST";
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const { data, loading, error, refetch } = useClientFetch<IData>(
    SEARCH_COLLECTIONS,
    {
      variables: {
        ...filters,
        sort,
        offset,
      },
      fetchPolicy: "cache-and-network",
    },
    true
  );

  useEffect(() => {
    refetch({ filters });
  }, [filters, refetch]);

  useEffect(() => {
    refetch({ sort, offset });
  }, [sort, offset, refetch]);

  const handleSortChange = (newSort: "LATEST" | "LOWEST_ACCURACY") => {
    router.push(`/explore?sort=${newSort}&offset=0`);
  };

  const handleOffsetChange = (newOffset: number) => {
    router.push(`/explore?sort=${sort}&offset=${newOffset}`);
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const collections = data?.searchCollections || initialData.searchCollections;

  return (
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
              <Card key={collection.id}>
                <Card.Access access={collection.access} />
                <Image
                  src={collection.imgUrl}
                  alt={collection.id}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div style={{ height: 110 }}>
                  <Card.Title className={styles.cardTitle}>
                    {collection.name}
                  </Card.Title>
                  <Card.Description>{collection.description}</Card.Description>
                </div>
                <Card.Info>
                  <span>
                    <strong>{quizCount}</strong> 문제
                  </span>
                  <span>
                    최근정답률(%) <strong>{recentRate ?? "-"}</strong>
                  </span>
                  <span>
                    총합정답률(%) <strong>{totalRate ?? "-"}</strong>
                  </span>
                  <span>{collection.category.name}</span>
                </Card.Info>
                <Link href={`/collections/${collection.id}`}>
                  <ContainedButton
                    className={clsx(styles.cardBtn, styles.cardBtn_card)}
                  >
                    시작
                  </ContainedButton>
                </Link>
              </Card>
            );
          } else if (selectedSearchGrid === "list") {
            return (
              <List key={collection.id}>
                <List.Access access={collection.access} />
                <Image
                  src={collection.imgUrl}
                  alt={collection.id}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div style={{ width: 300 }}>
                  <List.Title className={styles.cardTitle}>
                    {collection.name}
                  </List.Title>
                  <List.Description>{collection.description}</List.Description>
                </div>
                <Card.Info>
                  <span>
                    <strong>{quizCount}</strong> 문제
                  </span>
                  <span>
                    최근정답률(%) <strong>{recentRate ?? "-"}</strong>
                  </span>
                  <span>
                    총합정답률(%) <strong>{totalRate ?? "-"}</strong>
                  </span>
                  <span>{collection.category.name}</span>
                </Card.Info>
                <Link href={`/collections/${collection.id}/quizzes/123`}>
                  <ContainedButton
                    className={clsx(styles.cardBtn, styles.cardBtn_list)}
                  >
                    시작
                  </ContainedButton>
                </Link>
              </List>
            );
          }
        }
      )}
    </div>
  );
}
