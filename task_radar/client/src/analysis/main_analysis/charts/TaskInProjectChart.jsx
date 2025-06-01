import { Bar } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalTaskChart = ({ projects }) => {
  const labels = projects.map((proj) => proj.name);
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Tasks',
        data: projects.map((proj) =>
          Array.isArray(proj.tasks) ? proj.tasks.length : 0
        ),
        backgroundColor: 'rgba(72, 187, 120, 0.7)', 
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        beginAtZero: true,
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" boxShadow="md" color="white" minH="300px">
      <Heading size="sm" mb={4} textAlign="center">
        Tasks per Project
      </Heading>
      <Box height="490px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default HorizontalTaskChart;
