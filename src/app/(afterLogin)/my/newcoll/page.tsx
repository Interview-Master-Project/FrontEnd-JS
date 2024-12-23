"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GET_ALL_CATEGORIES, IData } from "@/graphql/query/get-all-categories";
import { useClientFetch } from "@/hooks/useClientFetch";
import { useCollectionFormStore } from "@/store/useCollectionFormStore";
import { FormGroup } from "../../_component/formGroup/FormGroup";
import previewImage from "../../../../../public/default_image.png";
import Image from "next/image";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import {
  AiOutlineCheck as VMark,
  AiOutlineClose as XMark,
} from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import Selector from "@/app/_component/selector/Selector";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import styles from "./page.module.scss";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export default function Page() {
  const { data } = useClientFetch<IData>(GET_ALL_CATEGORIES, {}, false);
  const {
    name,
    changeName,
    image,
    changeImage,
    description,
    changeDescription,
    access,
    changeAccess,
    categoryId,
    changeCategoryId,
  } = useCollectionFormStore();

  useEffect(() => {
    changeName("");
    changeImage(null);
    changeDescription("");
    changeAccess("PUBLIC");
    changeCategoryId("1");
  }, [
    changeAccess,
    changeCategoryId,
    changeDescription,
    changeImage,
    changeName,
  ]);

  const [editName, setEditName] = useState(false);
  const [isValidName, setIsValidName] = useState<boolean | null>(null);
  const handleNameBlur = () => {
    setEditName(false);

    if (name.trim().length < 3) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  };

  const [editDescription, setEditDescription] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState<boolean | null>(
    null
  );
  const handleDescriptionBlur = () => {
    setEditDescription(false);

    if (description.trim().length < 3) {
      setIsValidDescription(false);
    } else {
      setIsValidDescription(true);
    }
  };

  const imageRef = useRef<HTMLInputElement>(null);
  const [viewerImage, setViewerImage] = useState<any>(image);
  const handleChangeImage = (file: File | undefined) => {
    if (!file) return null;

    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 2MB를 초과할 수 없습니다.");
      changeImage(null);
      setViewerImage(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setViewerImage(reader.result as string);
    };
  };

  const handleChangeCategory = (selectedId: string) => {
    changeCategoryId(selectedId);
  };

  const router = useRouter();
  const { isLoading, error, handleSubmit } = useFormSubmit({
    endpoint: "/api/collections",
    onSuccess: () => {
      window.location.assign("/my");
    },
    onError: (error) => console.error(error),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("access", access);
    formData.append(
      "categoryId",
      categoryId ?? (data?.getAllCategories[0].id as string)
    );
    if (image) {
      formData.append("image", image);
    } else {
      // 기본 이미지를 File 객체로 변환하여 추가
      const response = await fetch("/default_image.png");
      const blob = await response.blob();
      const defaultImageFile = new File([blob], "default_image.png", {
        type: "image/png",
      });
      formData.append("image", defaultImageFile);
    }

    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormGroup label="컬렉션 제목" formName="name">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setEditName(true);
            changeName(e.target.value);
          }}
          onBlur={handleNameBlur}
          placeholder="컬렉션 제목을 적어주세요"
          required
        />
        <FormGroup.Message validity={isValidName}>
          {isValidName ? (
            <>
              <VMark />
              <p>사용 가능한 컬렉션 제목입니다.</p>
            </>
          ) : (
            <>
              <XMark />
              <p>제목은 3글자 이상 입력해야 합니다.</p>
            </>
          )}
        </FormGroup.Message>
      </FormGroup>
      <FormGroup label="컬렉션 이미지" formName="image" optional>
        <div className={styles.formGroupContainer}>
          <div className={styles.groupSection__reverseBg}>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              ref={imageRef}
              onChange={(e) => {
                handleChangeImage(e.target.files?.[0]);
                changeImage(e.target.files?.[0]);
              }}
              hidden
            />
            <Image
              src={viewerImage ?? previewImage}
              alt="미리보기"
              width={80}
              height={80}
            />
          </div>
          <div className={styles.groupSection}>
            <span>
              이미지는 <strong>.jpg .jpeg .png</strong> 확장자만 가능합니다.
            </span>
            <div className={styles.imageBtn}>
              {!image && (
                <ContainedButton
                  type="button"
                  variant="green"
                  onClick={() => imageRef.current?.click()}
                >
                  이미지 첨부
                </ContainedButton>
              )}
              {image && (
                <OutlinedButton
                  type="button"
                  variant="red"
                  onClick={() => {
                    setViewerImage(null);
                    changeImage(null);
                  }}
                >
                  초기화
                </OutlinedButton>
              )}
            </div>
          </div>
        </div>
      </FormGroup>
      <FormGroup label="카테고리" formName="categoryId">
        <div
          className={styles.formGroupContainer}
          style={{ width: "100%", height: "100%" }}
        >
          {data?.getAllCategories && (
            <Selector
              width="inherit"
              onChange={handleChangeCategory}
              options={data?.getAllCategories.map(
                ({ id: value, name: label }) => ({ value, label })
              )}
              scrollOption
            />
          )}
        </div>
      </FormGroup>
      <FormGroup label="상세 설명" formName="description">
        <TextareaAutosize
          id="desciption"
          name="description"
          value={description}
          onChange={(e) => changeDescription(e.target.value)}
          onBlur={handleDescriptionBlur}
          required
        />
        <FormGroup.Message validity={isValidDescription}>
          {isValidDescription ? (
            <VMark />
          ) : (
            <>
              <XMark />
              <p>상세 설명은 3글자 이상 입력해야 합니다.</p>
            </>
          )}
        </FormGroup.Message>
      </FormGroup>
      <FormGroup label="공개 범위" formName="access">
        <div
          className={`${styles.formGroupContainer} ${styles.formGroupContainer__column}`}
        >
          <label>
            <input
              type="radio"
              name="access"
              value="PUBLIC"
              checked={access === "PUBLIC"}
              onChange={(e) => changeAccess(e.target.value as typeof access)}
            />
            <div className={styles.labelContent}>
              <PublicIcon className={styles.icon} />
              <div>
                <strong>Public</strong>
                <p>해당 컬렉션이 모든 유저에게 노출됩니다.</p>
              </div>
            </div>
          </label>
          <label>
            <input
              type="radio"
              name="access"
              value="PRIVATE"
              checked={access === "PRIVATE"}
              onChange={(e) => changeAccess(e.target.value as typeof access)}
            />
            <div className={styles.labelContent}>
              <PrivateIcon className={styles.icon} />
              <div>
                <strong>Private</strong>
                <p>해당 컬렉션은 나 자신만 볼 수 있습니다.</p>
              </div>
            </div>
          </label>
        </div>
      </FormGroup>

      {error && <p>{error}</p>}

      <div className={styles.cancelSaveSection}>
        <ContainedButton type="submit" disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장 및 추가"}
        </ContainedButton>
        <Link href="/my">
          <OutlinedButton variant="red" type="button">
            취소
          </OutlinedButton>
        </Link>
      </div>
    </form>
  );
}
