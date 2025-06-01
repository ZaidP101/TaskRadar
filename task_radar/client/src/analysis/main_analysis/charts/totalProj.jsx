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
  // Format: "MMM YYYY" (e.g., "Jun 2025")
  return `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
}

const ProjectsByStatus = ({ projects }) => {
  // Count projects by month-year
  const countsByMonth = {};
  projects?.forEach(p => {
    if (!p.createdAt) return;
    const label = getMonthYear(p.createdAt);
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
        label: "Projects Created",
        data: labels.map(l => countsByMonth[l]),
        fill: true,
        borderColor: "#4299E1",
        backgroundColor: "rgba(66,153,225,0.2)",
        pointBackgroundColor: "#38A169",
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
        text: "Projects Created Over Time",
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
        title: { display: true, text: "Projects", color: "white" },
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
        Projects Timeline
      </Heading>
      <Box h="350px">
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ProjectsByStatus;
