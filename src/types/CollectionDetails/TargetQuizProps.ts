import { IDetailsProps } from "./types";
import { GetQuizzesWithAttemptByCollectionIdQuery } from "@/__api__/types";

type quizElement<T> = T extends Array<infer U> ? U : never;

export interface TargetQuizProps extends IDetailsProps {
  quizElement: quizElement<
    GetQuizzesWithAttemptByCollectionIdQuery["getQuizzesWithAttemptByCollectionId"]
  >;
  quizIdx: number;
}
