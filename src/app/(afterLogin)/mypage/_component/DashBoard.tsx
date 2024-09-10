import styles from "./dashBoard.module.scss";
import cx from "classnames";
import { generateLogData } from "@/app/(afterLogin)/mypage/_function/generateLogData";
import dayjs from "dayjs";

export default function DashBoard() {
  const CHECK_ROW = 7;
  const CHECK_COL = 20;

  // 0. 더미 데이터 로그 생성
  // 인수 - 현재 날짜
  const data = generateLogData(dayjs().format("YYYY-MM-DD"));

  // 1. 7열 20행짜리 배열 생성
  const checkBoard = Array.from({ length: CHECK_ROW }, (_, rowIndex) =>
    Array.from({ length: CHECK_COL }, (_, colIndex) => {
      return { rowIndex, colIndex };
    })
  );

  // 2. count 최대 값 계산
  const countsArr: number[] = [];
  data.map(({ count }) => countsArr.push(count));
  const maxCount = Math.max(...countsArr);

  // 3. 과거 데이터 누락 시, 즉 데이터가 충분치 않은 경우 예외 테스트
  for (let i = 0; i < 20; i++) {
    data.pop();
  }

  return (
    <div className={styles.dashboard}>
      <h3>내 로그</h3>
      <table className={styles.board}>
        <tbody>
          {checkBoard.map((innerArr, rowIndex) => (
            <tr key={`${rowIndex}_${Math.random()}`}>
              {innerArr.map((box, colIndex) => {
                // data 배열에서 해당하는 rowIndex와 colIndex를 가진 데이터가 있는 지 확인
                let colorGrade = cx();
                const targetData = data.find(
                  (log) =>
                    log.colIndex === colIndex && log.rowIndex === rowIndex
                );
                if (targetData === undefined || targetData.count === 0) {
                  colorGrade = cx(styles.boardNone);
                } else if (maxCount / 3 > targetData.count) {
                  colorGrade = cx(styles.boardLight);
                } else if (maxCount / 1.5 > targetData.count) {
                  colorGrade = cx(styles.boardBase);
                } else {
                  colorGrade = cx(styles.boardDark);
                }

                return (
                  <td
                    key={`${colIndex}_${Math.random()}`}
                    className={colorGrade}
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
