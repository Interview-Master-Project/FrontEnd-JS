import { create } from "zustand";

interface IUserEdit {
  image: {
    init: string | null; // 최초 이미지
    preview: string | null; // 현재 이미지 미리보기용
    toBe: File | null; // 바꿀 이미지(아바타의 경우도 포함)
    deleteImgOnly: boolean; // 이미지 삭제 여부
  };
  nickname: {
    init: string | null; // 최초 이름
    toBe: string | null; // 바꿀 이름
    valid: boolean | null; // 유효성 검증 결과
  };
  setImage: (image: string, what: keyof IUserEdit["image"]) => void;
  setSubmitImage: (toBe: File | null) => void;
  setDeleteImgOnly: (deleteImgOnly: boolean) => void;
  setSubmitNickname: (toBe: string) => void;
  isValidNickname: (valid: any) => void;
}

export const useUserEditStore = create<IUserEdit>((set) => ({
  image: {
    init: null,
    preview: null,
    toBe: null,
    deleteImgOnly: false,
  },
  nickname: {
    init: null,
    toBe: null,
    valid: null,
  },
  setPreviewImage: (preview) =>
    set(({ image }) => ({
      image: {
        ...image,
        preview,
      },
    })),
  setSubmitImage: (toBe) =>
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
  setSubmitNickname: (toBe) =>
    set(({ nickname }) => ({
      nickname: {
        ...nickname,
        toBe,
      },
    })),
  isValidNickname: (valid) =>
    set(({ nickname }) => ({
      nickname: {
        ...nickname,
        valid,
      },
    })),
}));
