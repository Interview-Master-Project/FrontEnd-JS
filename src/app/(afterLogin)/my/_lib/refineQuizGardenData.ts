import { GetQuizGardenQuery } from "@/__api__/types";
import dayjs from "dayjs";

export const refineQuizGardenData = (data: GetQuizGardenQuery) => {
  const definiteTypesHeader = [
    {
      type: "date",
      id: "Date",
    },
    {
      type: "number",
      id: "QuizzesSolved",
    },
    {
      type: "string",
      role: "tooltip",
      p: { html: true },
    },
  ];

  const refinedData = data.getQuizGarden.map((cell) => {
    const color = "blue";

    return [
      new Date(cell?.date!),
      cell?.quizzesSolved!,
      `<div style='margin:10px 20px; font-size:16px; color: black !important;'>${dayjs(
        cell?.date!
      ).format(
        "MM월 DD일"
      )}<br /><p style='color: ${color}'>풀이 ${cell?.quizzesSolved!}회<p></div>`,
    ];
  });

  return [definiteTypesHeader, ...refinedData];
};
