import { Doughnut } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PriorityChart = ({ tasks }) => {
  // Count tasks by priority
  const low = tasks.filter(t => t.priority === 'low').length;
  const medium = tasks.filter(t => t.priority === 'medium').length;
  const high = tasks.filter(t => t.priority === 'high').length;
  const critical = tasks.filter(t => t.priority === 'critical').length;

  const data = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Task Priority',
        data: [low, medium, high, critical],
        backgroundColor: ['#63b3ed', '#f6e05e', '#f56565', '#c53030'],
        borderColor: ['#3182ce', '#d69e2e', '#c53030', '#742a2a'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Task Priority Distribution
      </Heading>
      <Box h="490px">
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};

export default PriorityChart;
