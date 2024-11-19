import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  userId: number;
  nickname: string;
}

interface IUserStore {
  user: IUser | null;
  loginUser: (info: IUser) => void;
  logoutUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      loginUser: (info) =>
        set((state) => ({
          user: {
            ...state.user,
            ...info,
          },
        })),
      logoutUser: () => set(() => ({ user: null })),
    }),
    {
      name: "user-storage", // 로컬스토리지에 저장될 키 이름
      partialize: (state) => ({ user: state.user }), // user 상태만 저장
    }
  )
);
