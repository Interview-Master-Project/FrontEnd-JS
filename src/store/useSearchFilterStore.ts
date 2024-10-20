import { create } from "zustand";

interface ISearchFilterStore {
  selectedFilterList: string[];
  changeFilter: (filter: string) => void;
}

// zustand 상태 분리
// 검색어 상태
// 카테고리 상태
// 고급 질의 상태
export const useSearchFilterStore = create<ISearchFilterStore>((set) => ({
  selectedFilterList: [],
  changeFilter: (filter: string) =>
    set((state) => {
      if (!state.selectedFilterList.includes(filter)) {
        return { selectedFilterList: [...state.selectedFilterList, filter] };
      } else {
        return {
          selectedFilterList: state.selectedFilterList.filter(
            (item) => item !== filter
          ),
        };
      }
    }),
}));
