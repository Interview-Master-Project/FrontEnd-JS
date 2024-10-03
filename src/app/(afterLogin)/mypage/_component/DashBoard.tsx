import { checkBoard, calculateData } from "../_lib/calculateData";
import clsx from "clsx";
import dayjs from "dayjs";
import { apollo } from "@/graphql/apolloClient";
import { GET_QUIZ_GARDEN } from "@/graphql/query";
import styles from "./dashBoard.module.scss";

const days = ["", "M", "", "W", "", "F", ""]; // 요일 정보를 배열로 정의

interface ILog {
  date: string;
  dayIndex: number;
  quizzesSolved: number;
  weekIndex: number;
}

interface IGarden {
  getQuizGarden: ILog[];
}

export default async function DashBoard() {
  const { data }: { data: IGarden } = await apollo.query({
    query: GET_QUIZ_GARDEN,
    variables: {
      endDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
      startDate: dayjs().subtract(133, "day").format("YYYY-MM-DD"),
    },
  });

  console.log(data);

  // const data = calculateData(); // dummy data 생성
  const maxCount = Math.max(
    ...data?.getQuizGarden?.map((log) => log.quizzesSolved, 0)
  );
  const todayCount =
    data?.getQuizGarden?.find(
      (log) => log.date === new Date().toISOString().split("T")[0]
    )?.quizzesSolved || 0;
  const totalCount = data?.getQuizGarden?.reduce(
    (acc, log) => acc + log.quizzesSolved,
    0
  );

  return (
    <div className={styles.dashboard}>
      <h3>내 로그</h3>
      <div className={styles.info}>
        <span>Today: {todayCount}</span>
        <span>Max: {maxCount}</span>
        <span>Total: {totalCount}</span>
      </div>
      <table className={styles.board}>
        <tbody>
          {checkBoard.map((innerArr, rowIndex) => (
            <tr key={`${rowIndex}_${Math.random()}`}>
              <div className={styles.day}>{days[rowIndex] || ""}</div>
              {innerArr.map((_, colIndex) => {
                // data 배열에서 해당하는 rowIndex와 colIndex를 가진 데이터가 있는 지 확인
                const targetData = data?.getQuizGarden?.find(
                  (log) =>
                    log.weekIndex === colIndex && log.dayIndex === rowIndex
                );

                return (
                  <td
                    key={`${colIndex}_${Math.random()}`}
                    className={clsx({
                      [styles.boardNone]:
                        targetData === undefined ||
                        targetData.quizzesSolved === 0,
                      [styles.boardLight]:
                        targetData &&
                        targetData.quizzesSolved > 0 &&
                        targetData.quizzesSolved <= maxCount / 3,
                      [styles.boardBase]:
                        targetData &&
                        targetData.quizzesSolved > maxCount / 3 &&
                        targetData.quizzesSolved <= maxCount / 1.5,
                      [styles.boardDark]:
                        targetData && targetData.quizzesSolved > maxCount / 1.5,
                    })}
                    title={
                      (targetData?.date.slice(-8) as string) <=
                        dayjs().format("YY-MM-DD") && targetData
                        ? `날짜: ${targetData.date} 제출 수: ${targetData.quizzesSolved}`
                        : "제출 이력이 없습니다."
                    }
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
