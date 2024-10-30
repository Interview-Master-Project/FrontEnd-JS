"use client";

import { redirect } from "next/navigation";
import { useClientFetch } from "@/hooks/useClientFetch";
import { ME, IData as IMEData } from "@/graphql/query/me";
import { GET_COLLECTION, IData } from "@/graphql/query/get-collection";
import CollectionDetails from "@/app/(afterLogin)/_component/isCreatorValidation/CollectionDetails";

type Props = {
  params: {
    collId: string;
  };
};

export default function Page({ params }: Props) {
  const { data: dataOfMe } = useClientFetch<IMEData>(ME, {}, true);
  const { data } = useClientFetch<IData>(
    GET_COLLECTION,
    {
      variables: {
        collectionId: params.collId,
      },
    },
    true
  );

  if (data?.getCollection.creator.id === dataOfMe?.me.id) {
    redirect(`/my/collections/${params.collId}`);
  }

  return (
    <>
      <CollectionDetails isCreator={false} data={data} />
    </>
  );
}
