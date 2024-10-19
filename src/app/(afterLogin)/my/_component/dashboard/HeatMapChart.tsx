"use client";

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useClientFetch } from "@/hooks/useClientFetch";
import { GET_QUIZ_GARDEN, IData } from "@/graphql/query/get-quiz-garden";
import dayjs from "dayjs";
import styles from "./heatMapChart.module.scss";

const calculateData = (count: number, data: IData, targetDay: number) => {
  const filteredData =
    data?.getQuizGarden
      .filter(({ dayIndex }) => dayIndex === targetDay)
      .sort((a, b) => a.weekIndex - b.weekIndex) || [];

  return Array.from({ length: count }, (_, i) => ({
    x: `W${i + 1}`,
    y: filteredData[i]?.quizzesSolved ?? 0,
  }));
};

export default function ApexChart() {
  const [isClient, setIsClient] = useState(false);
  const { data, loading, error } = useClientFetch<IData>(
    GET_QUIZ_GARDEN,
    {
      variables: {
        endDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
        startDate: dayjs().subtract(132, "day").format("YYYY-MM-DD"),
      },
    },
    true
  );

  const [series, setSeries] = useState<
    {
      name: string;
      data: { x: string; y: number; quizzesSolved?: number }[]; // quizzesSolved 추가
    }[]
  >([]);

  useEffect(() => {
    if (data) {
      const newSeries = [
        { name: "토", data: calculateData(20, data, 6) },
        { name: "금", data: calculateData(20, data, 5) },
        { name: "목", data: calculateData(20, data, 4) },
        { name: "수", data: calculateData(20, data, 3) },
        { name: "화", data: calculateData(20, data, 2) },
        { name: "월", data: calculateData(20, data, 1) },
        { name: "일", data: calculateData(20, data, 0) },
      ];
      setSeries(newSeries);
    }
  }, [data]);

  // ApexCharts 옵션 정의
  const options: ApexOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      colors: ["rgba(0,0,0,0.1)"],
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      x: {
        formatter: (value) => `${value}`, // X축 레이블
      },
      y: {
        formatter: (value) => `Solved: ${value}`, // Y축 값 포맷
      },
      custom: ({ seriesIndex, dataPointIndex }) => {
        const quizzesSolved =
          series[seriesIndex]?.data[dataPointIndex]?.quizzesSolved;

        return `<div style="padding: 5px;">Solved: ${quizzesSolved ?? 0}</div>`;
      },
    },
    colors: ["#008FFB"],
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.chartContainer}>
      <h3>내 로그</h3>
      {isClient && (
        <Chart
          className={styles.chart}
          style={{
            minWidth: 300,
            maxHeight: 300,
            minHeight: 0,
          }}
          options={options}
          series={series}
          type="heatmap"
          height={300}
        />
      )}
    </div>
  );
}
