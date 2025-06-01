import { Doughnut } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalTaskComp = ({ tasks }) => {
  // Count completed and not completed tasks
  const completed = tasks.filter(t => t.status === "completed").length;
  const notCompleted = tasks.length - completed;

  const data = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [completed, notCompleted],
        backgroundColor: ['#38a169', '#3182ce'],
        borderColor: ['#2f855a', '#2b6cb0'],
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
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Total Tasks Completed
      </Heading>
      <Box h="500px">
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TotalTaskComp;
