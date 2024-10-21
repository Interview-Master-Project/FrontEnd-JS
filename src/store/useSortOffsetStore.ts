import { create } from "zustand";

interface ISortOffsetStore {
  sort: "LATEST" | "LOWEST_ACCURACY";
  offset: number;
  changeSort: (indicator: string) => void;
  changeOffset: (offset: number) => void;
}

export const useSortOffsetStore = create<ISortOffsetStore>((set) => ({
  sort: "LATEST",
  offset: 0,
  changeSort: (indicator) => ({ sort: indicator }),
  changeOffset: (toGo) => ({ offset: toGo }),
}));
