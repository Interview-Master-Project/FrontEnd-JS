"use client";

import { useParams } from "next/navigation";
import CollectionDetails from "@/app/_component/CollectionDetails/CollectionDetails";
import QuizDetails from "@/app/_component/CollectionDetails/QuizDetails";

type Params = {
  collId: string;
};

export default function Page() {
  const { collId } = useParams() as Params;

  return (
    <>
      <CollectionDetails isCreator={true} collId={collId} />
      <QuizDetails isCreator={true} collId={collId} />
    </>
  );
}
