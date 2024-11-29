import { create } from "zustand";
import { SortOrder } from "@/__api__/types";

interface ISortOffsetStore {
  sort: SortOrder;
  offset: number;
  changeSort: (indicator: SortOrder) => void;
  changeOffset: (offset: number) => void;
}

export const useSortOffsetStore = create<ISortOffsetStore>((set) => ({
  sort: SortOrder.Latest,
  offset: 0,
  changeSort: (indicator) => set({ sort: indicator }),
  changeOffset: (toGo) => set({ offset: toGo }),
}));
