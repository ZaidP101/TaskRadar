// DonutChart.js
import { Doughnut } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ ongoing, completed }) => {
  const data = {
    labels: ['Ongoing Projects', 'Completed Projects'],
    datasets: [
      {
        label: 'Project Status',
        data: [ongoing, completed],
        backgroundColor: ['#3182ce', '#38a169'],
        borderColor: ['#2b6cb0', '#2f855a'],
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
    },
  };

  return (
    <Box bg="gray.600" p={4} borderRadius="md" shadow="md" color="white">
      <Heading size="sm" mb={4} textAlign="center">
        Project Status Distribution
      </Heading>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default DonutChart;
