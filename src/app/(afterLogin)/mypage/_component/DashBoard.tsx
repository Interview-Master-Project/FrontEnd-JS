import styles from "./dashBoard.module.scss";
import cx from "classnames";
import dayOfYear from "dayjs/plugin/dayOfYear";
import "dayjs/locale/ko";
import dayjs from "dayjs";

dayjs.locale("ko");
dayjs.extend(dayOfYear);

export default function DashBoard() {
  const CHECK_ROW = 7; // 열 개수(고정)
  const CHECK_COL = 20; // 행 개수(유동)

  // dummy data
  const data = [
    { date: "2024-09-09", count: 5 },
    { date: "2024-09-08", count: 7 },
    { date: "2024-09-07", count: 0 },
    { date: "2024-09-06", count: 2 },
    { date: "2024-09-05", count: 0 },
    { date: "2024-09-04", count: 0 },
  ];

  // date를 모눈종이 인덱스 숫자화 (by 현재 날짜)
  // 오늘이 "2024-09-09" 이고 date가 "2024-09-08" 이라면 252 - 253 + CHECK_ROW * CHECK_COL
  const formatDate = (date: string) => dayjs(date).dayOfYear();
  // console.log(
  //   formatDate("2024-09-08") -
  //     formatDate(dayjs().format("YYYY-MM-DD")) +
  //     CHECK_ROW * CHECK_COL
  // );

  return (
    <div className={styles.dashboard}>
      <h3>대시보드</h3>
      <table className={styles.board}>
        <tbody>
          {Array.from({ length: CHECK_ROW }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: CHECK_COL }).map((_, colIndex) => {
                const dataIndex = colIndex;
                const currentData = data[dataIndex];

                return (
                  <td
                    key={rowIndex}
                    className={cx(
                      currentData &&
                        currentData.count !== 0 &&
                        styles.boardColored
                    )}
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
