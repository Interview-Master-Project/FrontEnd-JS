"use client";

import { useParams } from "next/navigation";
import { GET_COLLECTION, IData } from "@/graphql/query/get-collection";
import { useClientFetch } from "@/hooks/useClientFetch";
import CollectionDetails from "@/app/(afterLogin)/_component/isCreatorValidation/CollectionDetails";

export default function Page() {
  const params = useParams();

  const { data } = useClientFetch<IData>(
    GET_COLLECTION,
    {
      variables: {
        collectionId: params.collId,
      },
    },
    true
  );

  return (
    <>
      <CollectionDetails isCreator data={data} />
    </>
  );
}
