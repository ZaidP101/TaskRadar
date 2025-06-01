import { Bar } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ProjectStatusBarChart = ({ projects }) => {
  const labels = projects.map(proj => proj.name);
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Employees',
        data: projects.map(proj =>
          Array.isArray(proj.employees) ? proj.employees.length : 0
        ),
        backgroundColor: '#3182ce',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: 'white', autoSkip: false, maxRotation: 45, minRotation: 0 } },
      y: { ticks: { color: 'white' }, beginAtZero: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="300px" alignItems={"center"}>
      <Heading size="sm" mb={4} textAlign="center">
        Employees per Project
      </Heading>
      <Box h="490px" >
        <Bar data={data} options={options} sc/>
      </Box>
    </Box>
  );
};

export default ProjectStatusBarChart;
