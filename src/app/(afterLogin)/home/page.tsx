import { apollo } from "@/graphql/apolloClient";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import ISearchCollections from "@/model/search-collections";
import { Card } from "../_component/Card";
import Button from "@/app/_component/Button";
import styles from "./page.module.scss";

export default async function Page() {
  const { data }: { data: ISearchCollections } = await apollo.query({
    query: SEARCH_COLLECTIONS,
    variables: {
      keywords: "",
    },
  });

  return (
    <div className={styles.main}>
      {data.searchCollections.collectionWithAttempts.map(({ collection }) => (
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
          <Button className={styles.cardBtn}>시작</Button>
        </Card>
      ))}
    </div>
  );
}
