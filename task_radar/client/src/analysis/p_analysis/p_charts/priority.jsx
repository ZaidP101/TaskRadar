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

const Priority = ({ tasks }) => {
  // Count tasks by priority (case-insensitive)
  const low = tasks.filter(t => (t.priority || '').toLowerCase() === "low").length;
  const medium = tasks.filter(t => (t.priority || '').toLowerCase() === "medium").length;
  const high = tasks.filter(t => (t.priority || '').toLowerCase() === "high").length;
  const critical = tasks.filter(t => (t.priority || '').toLowerCase() === "critical").length;

  const data = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [low, medium, high, critical],
        backgroundColor: [
          "#4299e1",   // blue for low
          "#ecc94b",   // yellow for medium
          "#f56565",   // red for high
          "#805ad5"    // purple for critical
        ],
        borderColor: [
          "#2b6cb0",
          "#b7791f",
          "#c53030",
          "#553c9a"
        ],
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: "x", // Vertical bars
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#444" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "white", stepSize: 1 },
        grid: { color: "#444" },
        title: { display: true, text: "Tasks", color: "white" },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Tasks by Priority
      </Heading>
      <Box h="500px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default Priority;
