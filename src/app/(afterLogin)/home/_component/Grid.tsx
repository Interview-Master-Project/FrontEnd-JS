"use client";

import { Card } from "../../_component/Card";
import { List } from "../../_component/List";
import Button from "@/app/_component/Button";
import ISearchCollections from "@/model/search-collections";
import { useSearchGridStore } from "@/store/useSearchGridStore";
import clsx from "clsx";
import styles from "../page.module.scss";

export default function Grid({ data }: { data: ISearchCollections }) {
  const { selectedSearchGrid } = useSearchGridStore();

  return (
    <div
      className={clsx(styles.main, {
        [styles.main_card]: selectedSearchGrid === "card",
        [styles.main_list]: selectedSearchGrid === "list",
      })}
    >
      {data.searchCollections.collectionWithAttempts.map(({ collection }) => {
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
              <Card.Title className={styles.cardTitle}>
                {collection.name}
              </Card.Title>
              <Card.Description>{collection.description}</Card.Description>
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
              <div>
                <List.Title className={styles.cardTitle}>
                  {collection.name}
                </List.Title>
                <List.Description>{collection.description}</List.Description>
              </div>
              <Button className={clsx(styles.cardBtn, styles.cardBtn_list)}>
                시작
              </Button>
            </List>
          );
        }
      })}
    </div>
  );
}
