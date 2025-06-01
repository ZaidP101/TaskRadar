import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "../../../axios"; // Adjust path as needed

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskByAdmin = ({ tasks }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees, then filter admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        // Use your existing endpoint
        const res = await axios.get("/api/project/employees", { withCredentials: true });
        // Filter for role === "admin"
        setAdmins((res.data.data || []).filter(u => u.role === "admin"));
      } catch (err) {
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Prepare data for chart
  const adminNames = admins.map(a => a.name || a.email || "Unknown");
  const adminIds = admins.map(a => a._id);
  const taskCounts = adminIds.map(
    id => tasks.filter(t => t.createdBy && t.createdBy._id === id).length
  );

  const data = {
    labels: adminNames,
    datasets: [
      {
        label: "Tasks Created",
        data: taskCounts,
        backgroundColor: "#805ad5",
        borderColor: "#553c9a",
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: "white", stepSize: 1 },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <Box bg="gray.700" p={4} borderRadius="md" shadow="md" color="white">
      <Heading size="sm" mb={4} textAlign="center" color="teal.300">
        Tasks Created by Admin
      </Heading>
      {loading ? (
        <Box h="180px" display="flex" alignItems="center" justifyContent="center">
          <Spinner color="teal.300" />
        </Box>
      ) : admins.length === 0 ? (
        <Text color="gray.300" textAlign="center" h="180px">No admins found.</Text>
      ) : (
        <Box h="180px">
          <Bar data={data} options={options} />
        </Box>
      )}
    </Box>
  );
};

export default TaskByAdmin;
