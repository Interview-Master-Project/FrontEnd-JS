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
import { useMutation } from "@apollo/client";
import { LIKE } from "@/graphql/mutation/like";
import { UNLIKE } from "@/graphql/mutation/unlike";
import { useCookies } from "next-client-cookies";
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

  // for render data
  const targetData = isLoggedIn ? (data as IALData) : (data as IBLData);
  const collections = isLoggedIn
    ? (data as IALData)?.searchCollectionsForAuthUser ??
      (initialData as IALData).searchCollectionsForAuthUser
    : (data as IBLData)?.searchCollectionsForGuest ??
      (initialData as IBLData).searchCollectionsForGuest;

  const cookies = useCookies();
  const token = cookies.get("authToken");

  // like/unlike mutation
  const [likeCollection] = useMutation(LIKE);
  const [unlikeCollection] = useMutation(UNLIKE);
  const handleLikes = async (collectionId: string, isLiked: boolean) => {
    if (!isLoggedIn) return; // 로그인 유저만 실행 가능

    // isLiked 여부에 따라 실행할 mutation 조건부 처리
    const targetMutation = isLiked ? unlikeCollection : likeCollection;
    await targetMutation({
      variables: { collectionId },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
      update(cache, { data }) {
        if (!data) return;

        const prevData = cache.readQuery<IALData>({
          query: SEARCH_COLLECTIONS_FOR_AUTH_USER,
          variables,
        });

        if (prevData) {
          const updatedCollections =
            prevData.searchCollectionsForAuthUser.collectionsWithAttempt.map(
              (item) => {
                if (item.collection.id === collectionId) {
                  return {
                    ...item,
                    collection: {
                      ...item.collection,
                      likes: isLiked
                        ? item.collection.likes - 1
                        : item.collection.likes + 1,
                    },
                    isLiked: !isLiked,
                  };
                }
                return item;
              }
            );
          cache.writeQuery({
            query: SEARCH_COLLECTIONS_FOR_AUTH_USER,
            variables,
            data: {
              ...prevData,
              searchCollectionsForAuthUser: {
                ...prevData?.searchCollectionsForAuthUser,
                collectionsWithAttempt: updatedCollections,
              },
            },
          });
        }
      },
    });
  };

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
            isLiked,
            ...rest
          }) => {
            const { recentRate, totalRate } = calculateCorrectRate(rest);

            if (selectedSearchGrid === "card") {
              return (
                <Card
                  key={collection.id}
                  href={`/details/collections/${collection.id}`}
                >
                  <Card.ImageFrame
                    src={collection.imgUrl}
                    alt={`id: ${collection.id}`}
                  />
                  <Card.Access access={collection.access} />
                  <Card.Info>
                    <Card.Brief
                      title={collection.name}
                      category={collection.category.name}
                    />
                    <Card.Details
                      description={collection.description}
                      correctRate={totalRate ? `${totalRate}%` : "-"}
                      quizCount={quizCount}
                    >
                      <Card.Likes
                        likes={collection.likes}
                        isLiked={isLiked}
                        onMutate={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLikes(collection.id, isLiked);
                        }}
                      />
                    </Card.Details>
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
                  <List.Likes likes={collection.likes} />
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
