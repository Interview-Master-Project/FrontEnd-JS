import { apollo } from "@/graphql/apolloClient";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import ISearchCollections from "@/model/search-collections";
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
      <ul>
        {data.searchCollections.collectionWithAttempts.map(({ collection }) => (
          <li key={collection.id}>{collection.name}</li>
        ))}
      </ul>
    </div>
  );
}
