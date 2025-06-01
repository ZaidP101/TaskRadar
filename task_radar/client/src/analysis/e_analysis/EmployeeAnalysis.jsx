import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../../axios";

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
  SimpleGrid,
} from "@chakra-ui/react";
import { FiLogOut, FiEdit, FiSettings } from "react-icons/fi";
import TotalTaskCompleted from "./e_charts/totalTaskComp";
import TaskStatusPolarChart from "./e_charts/taskState";
import PriorityChart from "./e_charts/priority";
import TaskByAdmin from "./e_charts/taskByAdmin";
import LoadingScreen from "../../Loader";
import TimeSpentTask from "./e_charts/timeSpent";

const EmployeeAnalysis = () => {
  const { employeeId: rawId } = useParams();
  const employeeId = String(rawId); // Ensure string type for matching
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  const location = useLocation();
  const { name, email, status, paramProjectId } = location.state || {};
  const navigate = useNavigate();

  const effectiveProjectId = paramProjectId || localStorage.getItem("projectId");

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
      console.log(tasksRes)
      console.log(employeesRes)
      console.log(projectRes)

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
    } else {
      fetchDashboardData();
    }
  }, [effectiveProjectId]);

  if (loading) return <LoadingScreen/>;

  return (
    <Flex direction="column" height="100vh">
      {/* Top Navigation Bar */}
      <Flex bg="gray.800" color="white" px={6} py={3} align="center" justify="space-between">
        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">LOGO</Text>
          <Divider orientation="vertical" height="30px" />
          <Text fontSize="md">Project: {project?.name || "Unnamed Project"}</Text>
        </HStack>

        <HStack spacing={4}>
          <Avatar name={name || "User"} />
          <Box textAlign="right">
            <Text fontWeight="bold">{name || "Unknown"}</Text>
            <Text fontSize="sm">{email || "No Email"}</Text>
            <Text fontSize="sm" fontWeight="bold" color={
              status === "busy" ? "red.500" :
              status === "free" ? "green.500" :
              "gray.500"
            }>
              Status: {status || "Unknown"}
            </Text>
          </Box>
          <IconButton icon={<FiEdit />} onClick={() => navigate("/update-account")} aria-label="Edit" />
          <IconButton icon={<FiSettings />} onClick={() => navigate("/change-password")} aria-label="Settings" />
          <IconButton icon={<FiLogOut />} onClick={handleLogout} aria-label="Logout" />
        </HStack>
      </Flex>

      {/* Main Layout */}
      <Flex flex="1" overflow="hidden" bg="gray.800" color="white">
        {/* Left Sidebar - Employees */}
        <Box w="250px" p={4} bg="gray.600" overflowY="auto" m={2} borderRadius="md">
          <Heading size="sm" mb={4}>Project Members</Heading>
          <VStack align="start" spacing={4}>
            {employees.map((emp) => (
              <HStack key={emp._id} cursor="pointer" w="100%">
                <Avatar size="sm" name={emp.name || emp.email} />
                <Box>
                  <Text fontWeight="bold" color={
                    emp.status === "busy" ? "red.500" :
                    emp.status === "free" ? "green.500" :
                    "gray.500"
                  }>
                    {emp.name || emp.email}
                  </Text>
                  <Text fontSize="xs" color="gray.300">{emp.email}</Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Main Content - Analysis */}
        <Box flex="1" p={6} bg="gray.800" overflowY="auto">
          <Heading size="lg" mb={6}>Project Analysis</Heading>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
            <TotalTaskCompleted tasks={tasks}/>
            <TaskStatusPolarChart tasks={tasks}/>
            <PriorityChart tasks={tasks}/>
            <TaskByAdmin tasks={tasks}/>
            <TimeSpentTask tasks={tasks}/>

            <Box bg="gray.600" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
              <Heading size="sm" mb={4} textAlign="center">Stacked Bar Chart</Heading>
              <Text textAlign="center" color="gray.300">Stacked bar chart goes here</Text>
            </Box>
            <Box bg="gray.600" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
              <Heading size="sm" mb={4} textAlign="center">Horizontal Bar Chart</Heading>
              <Text textAlign="center" color="gray.300">Horizontal bar chart goes here</Text>
            </Box>
            <Box bg="gray.600" p={4} borderRadius="md" shadow="md" color="white" minH="260px">
              <Heading size="sm" mb={4} textAlign="center">Radar Chart</Heading>
              <Text textAlign="center" color="gray.300">Radar chart goes here</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EmployeeAnalysis;
