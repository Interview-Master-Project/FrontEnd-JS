import startSolve from "./startSolve";
import { redirect } from "next/navigation";

export async function quizRedirect(collId: string, redirectQuizId?: string) {
  if (redirectQuizId) {
    await startSolve(collId);
    redirect(`/collections/${collId}/quizzes/${redirectQuizId}`);
  } else {
    return { noQuizzes: true };
  }
}
