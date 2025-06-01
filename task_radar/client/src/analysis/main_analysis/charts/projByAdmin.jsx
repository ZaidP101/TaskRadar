import { PolarArea } from "react-chartjs-2";
import { Box, Heading } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const ProjectCreatedByAdminPolar = ({ projects }) => {
  const adminProjectCount = {};
  projects.forEach((proj) => {
    const admin = proj.createdBy?.name || proj.createdBy?.email || "Unknown";
    adminProjectCount[admin] = (adminProjectCount[admin] || 0) + 1;
  });

  const labels = Object.keys(adminProjectCount);
  const dataValues = Object.values(adminProjectCount);

  const backgroundColors = [
    "#3182ce", "#2f855a", "#dd6b20", "#d53f8c", "#805ad5", "#e53e3e"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Projects Created",
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      r: {
        angleLines: { color: "#aaa" },
        grid: { color: "#444" },
        pointLabels: { color: "white", font: { size: 14 } },
        ticks: { color: "white", beginAtZero: true },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="300px">
      <Heading size="sm" mb={4} textAlign="center">
        Projects Created by Admins
      </Heading>
      <Box h="430px">
        <PolarArea data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ProjectCreatedByAdminPolar;
