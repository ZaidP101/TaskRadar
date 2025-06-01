import { PolarArea } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const TaskStatusPolarChart = ({ tasks }) => {
  // Count tasks by each status
  const todo = tasks.filter(t => t.status === 'todo').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const readyForReview = tasks.filter(t => t.status === 'ready-for-review').length;

  const data = {
    labels: ['To Do', 'In Progress', 'Ready for Review'],
    datasets: [
      {
        label: 'Task Status',
        data: [todo, inProgress, readyForReview],
        backgroundColor: ['#3182ce', '#f6ad55', '#68d391'],
        borderColor: ['#2b6cb0', '#dd6b20', '#38a169'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        angleLines: { color: '#444' },
        grid: { color: '#444' },
        pointLabels: { color: 'white', font: { size: 14 } },
        ticks: { color: 'white', stepSize: 1, beginAtZero: true },
        min: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Task Status Distribution
      </Heading>
      <Box h="500px">
        <PolarArea data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TaskStatusPolarChart;
