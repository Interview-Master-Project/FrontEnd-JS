import { create } from "zustand";

interface IUserEdit {
  image: {
    preview: string | null; // 현재 이미지 미리보기용
    toBe: File | null; // 바꿀 이미지(아바타의 경우도 포함)
    deleteImgOnly: boolean; // 이미지 삭제 여부
  };
  nickname: {
    toBe: string | null; // 바꿀 이름
    isValid: boolean | null; // 유효성 검증 결과
  };
  setPreviewImage: (preview: string) => void;
  setToBeImage: (toBe: File | null) => void;
  setDeleteImgOnly: (deleteImgOnly: boolean) => void;
  setToBeNickname: (toBe: string) => void;
  isValidNickname: (enteredNickname: any) => void;
}

export const useUserEditStore = create<IUserEdit>((set) => ({
  image: {
    preview: null,
    toBe: null,
    deleteImgOnly: false,
  },
  nickname: {
    toBe: null,
    isValid: null,
  },
  setPreviewImage: (preview) =>
    set(({ image }) => ({
      image: {
        ...image,
        preview,
      },
    })),
  setToBeImage: (toBe) =>
    set(({ image }) => ({
      image: {
        ...image,
        toBe,
      },
    })),
  setDeleteImgOnly: (deleteImgOnly) =>
    set(({ image }) => ({
      image: {
        ...image,
        deleteImgOnly,
      },
    })),
  setToBeNickname: (toBe) =>
    set(({ nickname }) => ({
      nickname: {
        ...nickname,
        toBe,
      },
    })),
  isValidNickname: (enteredNickname) =>
    set(({ nickname }) => ({
      nickname: {
        ...nickname,
        isValid: enteredNickname.trim().length > 1,
      },
    })),
}));
