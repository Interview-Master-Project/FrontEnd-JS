import { create } from "zustand";

export type TCategories = Array<{ id: string; name: string }>;

export interface ISearchStore {
  keywords: string[];
  categories: string[];
  maxCorrectRate: number | undefined;
  addKeyword: (search: string) => void;
  removeKeyword: (keyword: string) => void;
  changeCategories: (categoryName: string) => void;
  removeCategory: (categoryName: string) => void;
  changeMaxCorrectRate: (rate: number) => void;
  removeMaxCorrectRate: () => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  keywords: [],
  categories: [],
  maxCorrectRate: undefined, // undefined라면 variables로 전달하지 않게 해야 함
  addKeyword: (search) => {
    set((state) => {
      if (!state.keywords.includes(search)) {
        return { keywords: [...state.keywords, search] };
      }
      return state; // 중복되는 검색어는 추가하지 않음
    });
  },
  removeKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.filter((kw) => kw !== keyword),
    })),
  changeCategories: (categoryName) => {
    set((state) => {
      if (!state.categories.some((name) => name.includes(categoryName))) {
        return { categories: [...state.categories, categoryName] };
      }
      return {
        categories: state.categories.filter((ct) => ct !== categoryName),
      };
    });
  },
  removeCategory: (categoryName) => {
    set((state) => ({
      categories: state.categories.filter((ct) => ct !== categoryName),
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
