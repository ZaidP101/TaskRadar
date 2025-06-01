import { Bar } from "react-chartjs-2";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
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

const TimeSpentTask = ({ tasks }) => {
  if (!tasks) return null;

  // Prepare chart data: show top 10 tasks by time spent (optional, for clarity)
  const sortedTasks = [...tasks].sort((a, b) => (b.totalTimeSpent || 0) - (a.totalTimeSpent || 0));
  const topTasks = sortedTasks.slice(0, 10);

  const chartLabels = topTasks.map(
    (task, idx) => task.title || task.name || `Task ${idx + 1}`
  );
  const chartData = topTasks.map(
    task => task.totalTimeSpent ? (task.totalTimeSpent / 3600).toFixed(1) : 0
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Time Spent (hours)",
        data: chartData,
        backgroundColor: "#38a169",
        borderColor: "#2f855a",
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: "y",
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
        title: { display: true, text: "Hours", color: "white" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Total Time Spent by Task
      </Heading>
      {tasks.length === 0 ? (
        <Text color="gray.300" textAlign="center" h="220px">
          No tasks found.
        </Text>
      ) : (
        <Box h="320px">
          <Bar data={data} options={options} />
        </Box>
      )}
    </Box>
  );
};

export default TimeSpentTask;
