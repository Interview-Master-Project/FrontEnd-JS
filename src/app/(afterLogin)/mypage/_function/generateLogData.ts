import dayjs from "dayjs";

export function generateLogData(startDate: string) {
  const data = [];
  let currentDate = dayjs(startDate);

  for (let colIndex = 19; colIndex >= 0; colIndex--) {
    for (let rowIndex = 6; rowIndex >= 0; rowIndex--) {
      // 만약 colIndex가 19라면 미래 날짜는 건너뛰기
      if (colIndex === 19 && rowIndex > dayjs().day()) {
        continue;
      }

      const count =
        Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 20) + 1;

      data.push({
        date: currentDate.format("YYYY-MM-DD"),
        rowIndex,
        colIndex,
        count,
      });

      if (rowIndex === 0 && colIndex === 0) return data;
      currentDate = currentDate.subtract(1, "day");
    }
  }

  return data;
}
