import { create } from "zustand";

interface IUser {
  nickname: string;
  userId: number;
}

interface IUserStore {
  user: IUser | null;
  loginUser: (info: IUser) => void;
  logoutUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  loginUser: (info) =>
    set((state) => ({
      user: {
        ...state.user,
        ...info,
      },
    })),
  logoutUser: () => set(() => ({ user: null })),
}));
