import { Box, Heading } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskStatus = ({ tasks }) => {
  // Count tasks by status (case-insensitive)
  const todo = tasks.filter(
    t => (t.status || '').toLowerCase() === "todo" || (t.status || '').toLowerCase() === "to do"
  ).length;
  const inProgress = tasks.filter(
    t => (t.status || '').toLowerCase() === "in-progress"
  ).length;
  const review = tasks.filter(
    t => (t.status || '').toLowerCase() === "ready-for-review"
  ).length;

  const data = {
    labels: ["To Do", "In Progress", "Ready for Review"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [todo, inProgress, review],
        backgroundColor: [
          "#3182ce", // blue
          "#f6ad55", // orange
          "#38a169", // green
        ],
        borderColor: [
          "#2b6cb0",
          "#dd6b20",
          "#2f855a",
        ],
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bars
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: "white", stepSize: 1 },
        grid: { color: "#444" },
        title: { display: true, text: "Tasks", color: "white" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Task Status Overview
      </Heading>
      <Box h="500px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TaskStatus;
