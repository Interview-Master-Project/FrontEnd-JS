import { apollo } from "@/graphql/apolloClient";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import ISearchCollections from "@/model/search-collections";
import { Card } from "../_component/Card";
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
          />
          <Card.Title className={styles.cardTitle}>
            {collection.name}
          </Card.Title>
          <Card.Description>{collection.description}</Card.Description>
        </Card>
      ))}
    </div>
  );
}
