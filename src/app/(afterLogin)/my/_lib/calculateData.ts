// import { generateLogData } from "./generateLogData";
// import dayjs from "dayjs";

const CHECK_ROW = 7;
const CHECK_COL = 20;

// 7열 20행짜리 배열 생성
export const checkBoard = Array.from({ length: CHECK_ROW }, (_, rowIndex) =>
  Array.from({ length: CHECK_COL }, (_, colIndex) => {
    return { rowIndex, colIndex };
  })
);

// export function calculateData() {
//   // 더미 데이터 로그 생성
//   // 인수 - 현재 날짜
//   const data = generateLogData(dayjs().format("YYYY-MM-DD"));

//   // 과거 데이터 누락 시, 즉 데이터가 충분치 않은 경우 예외 테스트
//   for (let i = 0; i < 20; i++) {
//     data.pop();
//   }

//   return data;
// }
