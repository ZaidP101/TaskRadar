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

const TotalEmp = ({ projects }) => {
  // Prepare labels (project names)
  const labels = projects.map(proj => proj.name);

  // For each project, count busy and free employees
  const busyCounts = projects.map(
    proj =>
      Array.isArray(proj.employees)
        ? proj.employees.filter(emp => emp.status === "busy").length
        : 0
  );
  const freeCounts = projects.map(
    proj =>
      Array.isArray(proj.employees)
        ? proj.employees.filter(emp => emp.status === "free").length
        : 0
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Busy Employees",
        data: busyCounts,
        backgroundColor: "#E53E3E",
        stack: "Stack 0",
      },
      {
        label: "Free Employees",
        data: freeCounts,
        backgroundColor: "#38A169",
        stack: "Stack 0",
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
        title: { display: true, text: "Project", color: "white" },
        stacked: true,
        ticks: { color: "white", autoSkip: false, maxRotation: 45, minRotation: 0 },
      },
      y: {
        title: { display: true, text: "Number of Employees", color: "white" },
        beginAtZero: true,
        stacked: true,
        ticks: { color: "white", stepSize: 1 },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="320px">
      <Heading size="md" mb={4} textAlign="center">
        Employees Busy/Free per Project
      </Heading>
      <Box h="400px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TotalEmp;
