"use client";

import { Chart } from "react-google-charts";
import { useFetchQuizGarden } from "../../_hooks/useFetchQuizGarden";
import { refineQuizGardenData } from "../../_lib/refineQuizGardenData";
import styles from "./myLog.module.scss";

export default function MyLog() {
  const { quizGardenData, loading, error } = useFetchQuizGarden();

  if (loading) return <p>데이터 불러오는 중...</p>;
  if (error) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  const chartOptions = {
    // title: "활동 기록",
    calendar: {
      yearLabel: {
        fontSize: 48,
        color: "gray",
        bold: true,
      },
      tooltip: {
        isHtml: true,
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <h3>내 로그</h3>
      <div className={styles.chartInnerContent}>
        <Chart
          chartType="Calendar"
          width="100%"
          height="300px"
          data={refineQuizGardenData(quizGardenData!)}
          options={chartOptions}
          className={styles.chart}
        />
      </div>
    </div>
  );
}
