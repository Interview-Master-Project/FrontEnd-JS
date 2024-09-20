import styles from "./dashBoard.module.scss";
import { checkBoard, calculateData } from "../_lib/calculateData";
import clsx from "clsx";

const days = ["", "M", "", "W", "", "F", ""]; // 요일 정보를 배열로 정의

export default function DashBoard() {
  const data = calculateData(); // dummy data 생성
  const maxCount = Math.max(...data.map((log) => log.count), 0);
  const todayCount =
    data.find((log) => log.date === new Date().toISOString().split("T")[0])
      ?.count || 0;
  const totalCount = data.reduce((acc, log) => acc + log.count, 0);

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
                const targetData = data.find(
                  (log) =>
                    log.colIndex === colIndex && log.rowIndex === rowIndex
                );

                return (
                  <td
                    key={`${colIndex}_${Math.random()}`}
                    className={clsx({
                      [styles.boardNone]:
                        targetData === undefined || targetData.count === 0,
                      [styles.boardLight]:
                        targetData &&
                        targetData.count > 0 &&
                        targetData.count <= maxCount / 3,
                      [styles.boardBase]:
                        targetData &&
                        targetData.count > maxCount / 3 &&
                        targetData.count <= maxCount / 1.5,
                      [styles.boardDark]:
                        targetData && targetData.count > maxCount / 1.5,
                    })}
                    title={
                      targetData
                        ? `날짜: ${targetData.date} 제출 수: ${targetData.count}`
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
