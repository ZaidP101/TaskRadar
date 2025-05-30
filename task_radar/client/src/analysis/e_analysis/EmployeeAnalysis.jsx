import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Flex,
  Avatar,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { FiLogOut, FiEdit, FiSettings } from "react-icons/fi";

const EmployeeAnalysis = () => {
  const { projectId: paramProjectId, employeeId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pauseReasons, setPauseReasons] = useState({});
  const [project, setProject] = useState(null);
  const location = useLocation();
  const { name, email, status, projectId: stateProjectId } = location.state || {};
  const navigate = useNavigate();

  console.log(`${name}, ${email}, ${status}`);

  const effectiveProjectId = paramProjectId || stateProjectId || localStorage.getItem("projectId");

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, employeesRes, projectRes] = await Promise.all([
        axios.get(`/api/task/project/${effectiveProjectId}`, { withCredentials: true }),
        axios.get(`/api/task/employee/${effectiveProjectId}`, { withCredentials: true }),
        axios.get(`/api/project/${effectiveProjectId}`, { withCredentials: true }),
      ]);

      setTasks(tasksRes.data.data || []);
      setEmployees(employeesRes.data.data || []);
      setProject(projectRes.data.project || null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    if (!effectiveProjectId) {
      console.warn("No projectId available for EmployeeDashboard.");
      // Optionally redirect or show a message
    } else {
      fetchDashboardData();
    }
  }, [effectiveProjectId]);

  if (loading) return <Text p={4}>Loading Dashboard...</Text>;

  return (
    <Flex direction="column" height="100vh">
      {/* Top Navigation Bar */}
      <Flex
        bg={"gray.800"}
        color={"white"}
        px={6}
        py={3}
        align="center"
        justify="space-between"
      >
        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            LOGO
          </Text>
          <Divider orientation="vertical" height="30px" />
          <Text fontSize="md">Project: {project?.name || "Unnamed Project"}</Text>
        </HStack>

        <HStack spacing={4}>
          <Avatar name={name || "User"} />
          <Box textAlign="right">
            <Text fontWeight="bold">{name || "Unknown"}</Text>
            <Text fontSize="sm">{email || "No Email"}</Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={
                status === "busy"
                  ? "red.500"
                  : status === "free"
                  ? "green.500"
                  : "gray.500"
              }
            >
              Status: {status || "Unknown"}
            </Text>
          </Box>
          <IconButton
            icon={<FiEdit />}
            onClick={() => navigate("/update-account")}
            aria-label="Edit"
          />
          <IconButton
            icon={<FiSettings />}
            onClick={() => navigate("/change-password")}
            aria-label="Settings"
          />
          <IconButton
            icon={<FiLogOut />}
            onClick={handleLogout}
            aria-label="Logout"
          />
        </HStack>
      </Flex>

      {/* Main Layout */}
      <Flex flex="1" overflow="hidden" bg={"gray.700"} color={"white"}>
        {/* Left Sidebar - Employees */}
        <Box
          w="250px"
          p={4}
          bg="gray.600"
          overflowY="auto"
          margin={2}
          borderRadius={"md"}
        >
          <Heading size="sm" mb={4}>
            Project Members
          </Heading>
          <VStack align="start" spacing={4}>
            {employees.map((emp) => (
              <HStack key={emp._id} cursor="pointer" w="100%">
                <Avatar size="sm" name={emp.name || emp.email} />
                <Box>
                  <Text
                    fontWeight="bold"
                    color={
                      emp.status === "busy"
                        ? "red.500"
                        : emp.status === "free"
                        ? "green.500"
                        : "gray.500"
                    }
                  >
                    {emp.name || emp.email}
                  </Text>
                  <Text fontSize="xs" color="gray.300">
                    {emp.email}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Main Content - Analysis */}
        <Box flex="1" p={6} overflowY="auto" bg="gray.700" color="black">
          <Heading size="lg" mb={4}>
            Employee Analysis
          </Heading>
          <Text>DonutChart and other employee-related analytics will go here.</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EmployeeAnalysis;
