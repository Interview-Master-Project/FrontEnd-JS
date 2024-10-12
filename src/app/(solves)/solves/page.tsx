"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  console.log(searchParams.get("collId"));

  return <div>page show</div>;
}
