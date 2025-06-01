import { Bar } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalTaskCompleted = ({ tasks }) => {
  // Calculate total completed and not completed
  const completed = tasks.filter(t => t.status === "completed").length;
  const notCompleted = tasks.length - completed;

  const data = {
    labels: ['Completed Tasks', 'Other Tasks'],
    datasets: [
      {
        label: 'Count',
        data: [completed, notCompleted],
        backgroundColor: ['#38a169', '#3182ce'],
        borderColor: ['#2f855a', '#2b6cb0'],
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Makes it horizontal
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: 'white', stepSize: 1 },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Tasks Completed
      </Heading>
      <Box h="405px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TotalTaskCompleted;
