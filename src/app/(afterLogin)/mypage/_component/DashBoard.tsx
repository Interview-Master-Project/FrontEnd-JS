import styles from "./dashBoard.module.scss";
import { checkBoard, calculateData } from "../_lib/calculateData";
// import cx from "classnames";
import clsx from "clsx";

export default function DashBoard() {
  const data = calculateData(); // dummy data 생성
  const maxCount = Math.max(...data.map((log) => log.count), 0);

  return (
    <div className={styles.dashboard}>
      <h3>내 로그</h3>
      <table className={styles.board}>
        <tbody>
          {checkBoard.map((innerArr, rowIndex) => (
            <tr key={`${rowIndex}_${Math.random()}`}>
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
