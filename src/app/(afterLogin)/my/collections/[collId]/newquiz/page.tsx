"use client";

import { useState } from "react";
import { useQuizFormStore } from "@/store/useQuizFormStore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_QUIZ } from "@/graphql/mutation/create-quiz";
import { FormGroup } from "@/app/(afterLogin)/_component/formGroup/FormGroup";
import TextareaAutosize from "react-textarea-autosize";
import {
  AiOutlineCheck as VMark,
  AiOutlineClose as XMark,
} from "react-icons/ai";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import styles from "./page.module.scss";
import { useCookies } from "next-client-cookies";

export default function Page() {
  const { collId: collectionId } = useParams();

  const { question, changeQuestion, answer, changeAnswer } = useQuizFormStore();
  const [isValidQ, setIsValidQ] = useState<boolean | null>(null);
  const [isValidA, setIsValidA] = useState<boolean | null>(null);
  const handleBlurQ = () => {
    if (question.trim().length < 3) {
      setIsValidQ(false);
    } else {
      setIsValidQ(true);
    }
  };
  const handleBlurAnswer = () => {
    if (answer.trim().length < 3) {
      setIsValidA(false);
    } else {
      setIsValidA(true);
    }
  };

  const [createQuiz, { data, loading, error }] = useMutation(CREATE_QUIZ);
  const cookies = useCookies();
  const token = cookies.get("authToken");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createQuiz({
        variables: {
          input: {
            question,
            answer,
            collectionId: +(Array.isArray(collectionId)
              ? collectionId[0]
              : collectionId),
          },
        },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      // router push 후 refresh
      console.log("Mutation result: ", res.data);
      window.location.replace(`/my/collections/${collectionId}`);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormGroup label="질문 제목" formName="question">
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(e) => changeQuestion(e.target.value)}
          minLength={3}
          onBlur={handleBlurQ}
          placeholder="질문 제목을 적어주세요."
          required
        />
        <FormGroup.Message validity={isValidQ}>
          {isValidQ ? (
            <>
              <VMark />
              <p>사용 가능한 질문 제목입니다.</p>
            </>
          ) : (
            <>
              <XMark />
              <p>제목은 3글자 이상 입력해야 합니다.</p>
            </>
          )}
        </FormGroup.Message>
      </FormGroup>
      <FormGroup label="답변 설명" formName="answer">
        <TextareaAutosize
          id="answer"
          name="answer"
          value={answer}
          minLength={3}
          onChange={(e) => changeAnswer(e.target.value)}
          onBlur={handleBlurAnswer}
          placeholder="질문에 대한 답변을 적어주세요."
          required
        />
        <FormGroup.Message validity={isValidA}>
          {isValidA ? (
            <>
              <VMark />
            </>
          ) : (
            <>
              <XMark />
              <p>답변은 3글자 이상 입력해야 합니다.</p>
            </>
          )}
        </FormGroup.Message>
      </FormGroup>

      {error && <p>퀴즈 생성 Failed</p>}

      <div className={styles.cancelSaveSection}>
        <ContainedButton type="submit" disabled={loading}>
          {loading ? "저장 중..." : "저장 및 추가"}
        </ContainedButton>
        <OutlinedButton variant="red" type="button">
          <Link href="/my">취소</Link>
        </OutlinedButton>
      </div>
    </form>
  );
}
