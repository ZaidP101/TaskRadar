import { Box, Heading } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Pie chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeStatus = ({ employees = [] }) => {
  // Count employees by status (case-insensitive)
  const busy = employees.filter(e => (e.status || '').toLowerCase() === "busy").length;
  const free = employees.filter(e => (e.status || '').toLowerCase() === "free").length;

  const data = {
    labels: ["Busy", "Free"],
    datasets: [
      {
        label: "Number of Employees",
        data: [busy, free],
        backgroundColor: ["#e53e3e", "#38a169"],
        borderColor: ["#c53030", "#2f855a"],
        borderWidth: 2,
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
      title: {
        display: true,
        text: "Employee Status Overview",
        color: "white",
        font: { size: 16 },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
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
        Employees by Status (Pie Chart)
      </Heading>
      <Box h="350px">
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default EmployeeStatus;
