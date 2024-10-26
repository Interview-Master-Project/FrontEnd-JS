import { create } from "zustand";

export type TCategories = { id: string; name: string };

type MaxLength<T extends any[]> = T["length"] extends 0 | 1 | 2 | 3 | 4 | 5
  ? T
  : string[];

export interface ISearchStore {
  keywords: MaxLength<string[]>;
  categories: TCategories[];
  maxCorrectRate: number | undefined;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  changeCategories: (selectedCategory: TCategories) => void;
  removeCategory: (targetCategory: TCategories) => void;
  changeMaxCorrectRate: (rate: number) => void;
  removeMaxCorrectRate: () => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  keywords: [],
  categories: [],
  maxCorrectRate: undefined, // undefined라면 variables로 전달하지 않게 해야 함
  addKeyword: (keyword) => {
    set((state) => {
      if (!state.keywords.includes(keyword)) {
        return { keywords: [...state.keywords, keyword] };
      }
      return state; // 중복되는 검색어는 추가하지 않음
    });
  },
  removeKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.filter((kw) => kw !== keyword),
    })),
  changeCategories: (selectedCategory) => {
    set((state) => {
      if (!state.categories.some((category) => category === selectedCategory)) {
        return { categories: [...state.categories, selectedCategory] };
      }
      return {
        categories: state.categories.filter(
          (category) => category !== selectedCategory
        ),
      };
    });
  },
  removeCategory: (targetCategory) => {
    set((state) => ({
      categories: state.categories.filter(({ id }) => id !== targetCategory.id),
    }));
  },
  changeMaxCorrectRate: (rate) => {
    set((state) => {
      if (state.maxCorrectRate !== rate) {
        return { maxCorrectRate: rate };
      }
      return { maxCorrectRate: undefined };
    });
  },
  removeMaxCorrectRate: () => {
    set(() => {
      return { maxCorrectRate: undefined };
    });
  },
}));
