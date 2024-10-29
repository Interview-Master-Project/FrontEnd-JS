"use client";

import { useState, useRef } from "react";
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
import axios from "axios";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("access", access);
      formData.append("categoryId", categoryId as string);
      if (image) formData.append("image", image);

      // await axios.post("/api/collections", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      console.log(formData.get("name"));
      console.log(formData.get("description"));
      console.log(formData.get("access"));
      console.log(formData.get("categoryId"));
      console.log(formData.get("image"));

      changeName("");
      changeImage(null);
      changeDescription("");
      changeAccess("PUBLIC");
      changeCategoryId(null);

      // redirect("/my");
    } catch (err) {
      setError("컬렉션 생성에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
        <input
          type="file"
          id="image"
          name="image"
          accept=".jpg,.jpeg,.png"
          ref={imageRef}
          onChange={(e) => {
            changeImage(e.target.files?.[0]);
          }}
        />
        <Image src={previewImage} alt="미리보기" width={80} height={80} />
        <div className={styles.imageBtn}>
          <ContainedButton variant="green">이미지 첨부</ContainedButton>
          <OutlinedButton variant="red">초기화</OutlinedButton>
        </div>
      </FormGroup>
      <FormGroup label="카테고리" formName="categoryId">
        <select
          name="categoryId"
          id="categoryId"
          value={categoryId ?? data?.getAllCategories[0].id}
          onChange={(e) => changeCategoryId(e.target.value)}
        >
          {data?.getAllCategories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </FormGroup>
      <FormGroup label="상세 설명" formName="description">
        <textarea
          id="description"
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
        <label>
          <input
            type="radio"
            name="access"
            value="PUBLIC"
            checked={access === "PUBLIC"}
            onChange={(e) => changeAccess(e.target.value as typeof access)}
          />
          Public
        </label>
        <label>
          <input
            type="radio"
            name="access"
            value="PRIVATE"
            checked={access === "PRIVATE"}
            onChange={(e) => changeAccess(e.target.value as typeof access)}
          />
          Private
        </label>
      </FormGroup>

      {error && <p>{error}</p>}

      <ContainedButton type="submit" disabled={isLoading}>
        {isLoading ? "저장 중..." : "저장 및 추가"}
      </ContainedButton>
      <OutlinedButton variant="red">취소</OutlinedButton>
    </form>
  );
}

// return (
//   <form className={styles.form}>
//     <Container title="컬렉션 제목">
//       <CollImgTitle />
//     </Container>
//     <Container title="상세 설명">
//       <CollDescription id={6} />
//     </Container>
//     <Container title="공개 범위 여부">
//       <CollAccess id={6} />
//     </Container>
//     <SelectCategories titleOp />
//     <div className={styles.cancelSaveSection}>
//       <ContainedButton>저장 및 추가</ContainedButton>
//       <Link href="/my">
//         <OutlinedButton variant="red">취소</OutlinedButton>
//       </Link>
//     </div>
//   </form>
// );
