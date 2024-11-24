"use client";

import { IDetailsProps } from "@/types/CollectionDetails/types";
import Container from "@/app/(afterLogin)/_component/Container";
import { useFetchQuiz } from "@/hooks/CollectionDetails/useFetchQuiz";
import CreateNewQuiz from "./CreateNewQuiz";
import Quiz from "./Quiz";

export default function QuizDetails({ isCreator, collId }: IDetailsProps) {
  const { quizData, quizLoading, quizError } = useFetchQuiz(collId);

  if (quizLoading) {
    return <div>퀴즈 정보를 불러오는 중...</div>;
  }
  if (quizError) {
    return (
      <p>
        퀴즈를 불러올 수 없습니다! 새로고침하거나 잠시 후 다시 시도해보세요.
      </p>
    );
  }

  return (
    <Container title="질문 리스트">
      <CreateNewQuiz isCreator={isCreator} collId={collId} />
      {quizData?.getQuizzesWithAttemptByCollectionId.length === 0 && (
        <p>등록된 퀴즈가 없습니다...</p>
      )}
      {quizData?.getQuizzesWithAttemptByCollectionId.map(
        (quizElement, quizIdx: number) => (
          <Quiz
            key={quizElement.quiz?.id}
            isCreator={isCreator}
            collId={collId}
            quizElement={quizElement}
            quizIdx={quizIdx}
          />
        )
      )}
    </Container>
  );
}
