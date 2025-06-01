import { Box, Heading } from "@chakra-ui/react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const TaskByAdmins = ({ tasks }) => {
  // Build a count of tasks created by each admin (from tasks themselves)
  const adminTaskCount = {};
  tasks.forEach((task) => {
    const admin =
      task.createdBy?.name ||
      task.createdBy?.email ||
      (typeof task.createdBy === "string" ? task.createdBy : "Unknown");
    adminTaskCount[admin] = (adminTaskCount[admin] || 0) + 1;
  });

  const labels = Object.keys(adminTaskCount);
  const dataValues = Object.values(adminTaskCount);

  const backgroundColors = [
    "#3182ce", "#2f855a", "#dd6b20", "#d53f8c", "#805ad5", "#e53e3e", "#f6ad55", "#38a169"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Tasks Created",
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "white" },
      },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        pointLabels: { color: "white" },
        angleLines: { color: "#444" },
        grid: { color: "#444" },
        ticks: { color: "white" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Tasks Created by Admins
      </Heading>
      <Box h="220px">
        <PolarArea data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TaskByAdmins;
