import React, { useContext, useEffect, useState } from "react";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import { CategoryType } from "../interface/Interface";

import { Box, Paper, Typography } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface Props {}

const ExpenseChart: React.FC<Props> = (props) => {
  const trackerContext = useContext(CoinTrackerContext);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        // text: 'INCOME',
      },
    },
  };

  const [expenseCategoryState, setExpenseCategoryState] = useState<CategoryType[]>([]);
  useEffect(() => {
    let expenseCategory = trackerContext.categoryDB.filter((el) => el.Type === "expense" && el.isEnabled === true);
    setExpenseCategoryState(expenseCategory);
  }, [trackerContext.categoryDB]);

  const labels = expenseCategoryState.map((el) => el.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: expenseCategoryState.map((el) => el.budget),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Paper elevation={10} style={{ marginTop: "32px" }}>
      <Typography
        variant="h5"
        component="h3"
        sx={{ textAlign: "left", padding: "10px", backgroundColor: "grey.200" }}
      >
        Expense
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > :not(style)": { m: 1 },
        }}
      >
        <Bar options={options} data={data} />
      </Box>
    </Paper>
  );
};

export default ExpenseChart;
