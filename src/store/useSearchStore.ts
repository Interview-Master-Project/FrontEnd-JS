import { create } from "zustand";

export type TCategories = Array<{ id: string; name: string }>;

export interface ISearchStore {
  keywords: string[];
  sort: "LATEST" | "LOWEST_ACCURACY";
  categories: TCategories;
  maxCorrectRate: number | undefined;
  changeKeywords: (search: string) => void;
  changeCategories: (categories: TCategories) => void;
  changeSort: (sortBy: "LATEST" | "LOWEST_ACCURACY") => void;
  changeMaxCorrectRate: (rate: number) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  keywords: [],
  sort: "LATEST",
  categories: [],
  maxCorrectRate: undefined, // undefined라면 variables로 전달하지 않게 해야 함
  changeKeywords: (search: string) => {
    set(() => {
      return { keywords: [search] };
    });
  },
  changeCategories: (categories: TCategories) => {
    set(() => {
      return { categories: [...categories] };
    });
  },
  changeSort: (sortBy: "LATEST" | "LOWEST_ACCURACY") => {
    set(() => {
      return { sort: sortBy };
    });
  },
  changeMaxCorrectRate: (rate: number) => {
    set(() => {
      return { maxCorrectRate: rate };
    });
  },
}));
