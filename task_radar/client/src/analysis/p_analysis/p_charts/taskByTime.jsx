import { Box, Heading } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getMonthYear(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
}

const TaskByTime = ({ tasks }) => {
  // Count tasks by month-year
  const countsByMonth = {};
  tasks?.forEach((t) => {
    if (!t.createdAt) return;
    const label = getMonthYear(t.createdAt);
    if (!label) return;
    countsByMonth[label] = (countsByMonth[label] || 0) + 1;
  });

  // Sort labels chronologically
  const labels = Object.keys(countsByMonth).sort((a, b) => {
    const [ma, ya] = a.split(" ");
    const [mb, yb] = b.split(" ");
    const da = new Date(`${ma} 1, ${ya}`);
    const db = new Date(`${mb} 1, ${yb}`);
    return da - db;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Tasks Created",
        data: labels.map((l) => countsByMonth[l]),
        fill: true,
        borderColor: "#38A169",
        backgroundColor: "rgba(56,161,105,0.2)",
        pointBackgroundColor: "#4299E1",
        pointBorderColor: "#fff",
        tension: 0.3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { labels: { color: "white" } },
      tooltip: { enabled: true },
      title: {
        display: true,
       
        color: "white",
        font: { size: 16 },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "Month", color: "white" },
        ticks: { color: "white" },
      },
      y: {
        title: { display: true, text: "Tasks", color: "white" },
        beginAtZero: true,
        ticks: { color: "white", stepSize: 1 },
      },
    },
  };

  return (
    <Box
      bg="gray.700"
      p={8}
      borderRadius="xl"
      shadow="lg"
      color="white"
      textAlign="center"
      minW="320px"
    >
      <Heading size="md" mb={4} color="teal.300">
        Tasks Timeline
      </Heading>
      <Box h="500px">
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TaskByTime;
