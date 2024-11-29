"use client";

import { useParams } from "next/navigation";
import { useFetchMe } from "@/hooks/useFetchMe";
import { useFetchCollection } from "@/hooks/CollectionDetails/useFetchCollection";
import { redirect } from "next/navigation";
import CollectionDetails from "@/app/_component/CollectionDetails/CollectionDetails";
import QuizDetails from "@/app/_component/CollectionDetails/QuizDetails";

type Params = {
  collId: string;
};

export default function Page() {
  const { collId } = useParams() as Params;
  const { meData } = useFetchMe();
  const { collectionData } = useFetchCollection(collId);

  if (collectionData?.getCollection?.creator?.id === meData?.me?.id) {
    redirect(`/my/collections/${collId}`);
  }

  return (
    <>
      <CollectionDetails isCreator={false} collId={collId} />
      <QuizDetails isCreator={false} collId={collId} />
    </>
  );
}
