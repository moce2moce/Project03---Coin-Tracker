import { Box, Paper, Typography } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";

import { CoinTrackerContext } from "../context/CoinTrackerContext";
import { generateDates, incomeOrExpense } from "../hooks/MultiChartHelperFN";

interface Props {}

const MultiChart: React.FC<Props> = (props) => {
  const trackerContext = useContext(CoinTrackerContext);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,

        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  let labels = generateDates(new Date(), new Date().getDate());

  // dokolku sakash samo za posledni nekolku dena (vo ovoj primer ima samo za posledni 7 dena)
  // let labels = generateDates(new Date(), 7);


  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeOrExpense("income", trackerContext.entriesArr),
        borderColor: "rgb(0 141 5 / 87%)",
        backgroundColor: " rgb(0 205 8)",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Expense",
        data: incomeOrExpense("expense", trackerContext.entriesArr),
        borderColor: "rgb(255 0 0)",
        backgroundColor: "rgb(255 0 0 / 60%)",
        yAxisID: "y1",
        tension: 0.4,
      },
    ],
  };
  return (
    <Paper elevation={10} style={{ marginTop: "32px" }}>
      <Typography
        variant="h5"
        component="h3"
        sx={{
          textAlign: "left",
          padding: "10px",
          backgroundColor: "grey.200",
          borderTopLeftRadius: "10px",
        }}
      >
        Income and Expenses
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > :not(style)": { m: 1 },
        }}
      >
        <Line options={options} data={data} />
      </Box>
    </Paper>
  );
};

export default MultiChart;
