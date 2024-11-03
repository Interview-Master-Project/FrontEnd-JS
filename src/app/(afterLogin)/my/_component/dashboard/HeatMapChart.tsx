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
    x: filteredData[i]?.date,
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
      data: { x: string; y: number }[]; // quizzesSolved 추가
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
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div style="padding: 10px; color: black;">' +
          "<span>" +
          "풀이 횟수: " +
          series[seriesIndex][dataPointIndex] +
          "</span>" +
          "</div>"
        );
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5, // 음영 강도 (0 ~ 1)
        colorScale: {
          ranges: [
            { from: 0, to: 0, color: "#f1f1f1", name: "0" }, // 데이터 없음
            { from: 1, to: 10, color: "#cae5ff", name: "1-10" }, // 낮은 값의 색상
            { from: 11, to: 30, color: "#87dbff", name: "11-30" }, // 중간 값의 색상
            { from: 31, to: 100, color: "#309bff", name: "31-100" }, // 높은 값의 색상
          ],
        },
      },
    },
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
          height={350}
        />
      )}
    </div>
  );
}
