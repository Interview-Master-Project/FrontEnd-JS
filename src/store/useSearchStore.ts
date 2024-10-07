import { create } from "zustand";

export type TCategories = Array<{ id: string; name: string }>;

interface ISearchStore {
  keywords: string[];
  sort: "LATEST" | "LOWEST_ACCURACY";
  categories: TCategories;
  changeKeywords: (search: string) => void;
  changeCategories: (categories: TCategories) => void;
  changeSort: (sortBy: "LATEST" | "LOWEST_ACCURACY") => void;
}

// keywords, sort, cateoryIds 상태에 변화가 생기면
// page.tsx를 재렌더링(즉, 재요청)
export const useSearchStore = create<ISearchStore>((set) => ({
  keywords: [],
  sort: "LATEST",
  categories: [],
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
}));
