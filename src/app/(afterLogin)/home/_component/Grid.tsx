"use client";

import { Card } from "../../_component/Card";
import { List } from "../../_component/List";
import Button from "@/app/_component/Button";
import { useSearchGridStore } from "@/store/useSearchGridStore";
import clsx from "clsx";
import { calculateCorrectRate } from "../_lib/calculateCorrectRate";
import { useQuery } from "@apollo/client";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import IData from "@/model/search-collections";
import styles from "../page.module.scss";

// 이 컴포넌트의 역할: 가져온 컬렉션 데이터 뿌리기

export default function Grid({ data }: { data: IData | undefined }) {
  const { selectedSearchGrid } = useSearchGridStore(); // 보기형식 === Card | List

  return (
    <div
      className={clsx(styles.main, {
        [styles.main_card]: selectedSearchGrid === "card",
        [styles.main_list]: selectedSearchGrid === "list",
      })}
    >
      {data?.searchCollections.collectionsWithAttempt?.map(
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
                <img
                  src={collection.imgUrl}
                  alt={collection.id}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
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
                </Card.Info>
                <Button className={clsx(styles.cardBtn, styles.cardBtn_card)}>
                  시작
                </Button>
              </Card>
            );
          } else if (selectedSearchGrid === "list") {
            return (
              <List key={collection.id}>
                <List.Access access={collection.access} />
                <img
                  src={collection.imgUrl}
                  alt={collection.id}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
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
                </Card.Info>
                <Button className={clsx(styles.cardBtn, styles.cardBtn_list)}>
                  시작
                </Button>
              </List>
            );
          }
        }
      )}
    </div>
  );
}
