"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuizFormStore } from "@/store/useQuizFormStore";
import { FormGroup } from "@/app/(afterLogin)/_component/formGroup/FormGroup";
import { useClientFetch } from "@/hooks/useClientFetch";
import {
  GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
  IData,
} from "@/graphql/query/get-quizzes-by-collection-id";
import { useMutation } from "@apollo/client";
import { EDIT_QUIZ } from "@/graphql/mutation/edit-quiz";
import {
  AiOutlineCheck as VMark,
  AiOutlineClose as XMark,
} from "react-icons/ai";
import TextareaAutoSize from "react-textarea-autosize";
import ContainedButton from "@/app/_component/button/ContainedButton";
import OutlinedButton from "@/app/_component/button/OutlinedButton";
import { useCookies } from "next-client-cookies";
import styles from "./page.module.scss";

export default function Page() {
  const { collId: collectionId, quizId } = useParams();
  const { question, changeQuestion, answer, changeAnswer } = useQuizFormStore();
  const { data: prevData } = useClientFetch<IData>(
    GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID,
    {
      variables: {
        collectionId,
      },
    },
    true
  );

  const targetQuiz = prevData?.getQuizzesWithAttemptByCollectionId.find(
    ({ quiz }) => quiz.id === quizId
  )?.quiz;

  useEffect(() => {
    if (prevData) {
      changeQuestion(targetQuiz?.question as string);
      changeAnswer(targetQuiz?.answer as string);
    }
  }, [prevData]);

  const [isValidQ, setIsValidQ] = useState<boolean | null>(null);
  const [isValidA, setIsValidA] = useState<boolean | null>(null);
  const handleBlurQ = () => {
    if (question.trim().length < 3) {
      setIsValidQ(false);
    } else {
      setIsValidQ(true);
    }
  };
  const handleBlurA = () => {
    if (answer.trim().length < 3) {
      setIsValidA(false);
    } else {
      setIsValidA(true);
    }
  };

  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("authToken");
  const [editQuiz, { data, loading, error }] = useMutation(EDIT_QUIZ);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await editQuiz({
        variables: {
          input: {
            answer,
            collectionId: +collectionId,
            question,
          },
          quizId,
        },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });

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
          minLength={3}
          onChange={(e) => changeQuestion(e.target.value)}
          onBlur={handleBlurQ}
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
        <TextareaAutoSize
          id="answer"
          name="answer"
          value={answer}
          minLength={3}
          onChange={(e) => changeAnswer(e.target.value)}
          onBlur={handleBlurA}
          required
        />
        <FormGroup.Message validity={isValidA}>
          {isValidA ? (
            <VMark />
          ) : (
            <>
              <XMark />
              <p>답변은 3글자 이상 입력해야 합니다.</p>
            </>
          )}
        </FormGroup.Message>
      </FormGroup>

      {error && <p>퀴즈 수정 Failed</p>}

      <div className={styles.cancelSaveSection}>
        <ContainedButton type="submit" disabled={loading}>
          {loading ? "저장 중..." : "변경사항 저장"}
        </ContainedButton>
        <OutlinedButton variant="red" type="button">
          <Link href={`/my/collections/${collectionId}`}>취소</Link>
        </OutlinedButton>
      </div>
    </form>
  );
}
