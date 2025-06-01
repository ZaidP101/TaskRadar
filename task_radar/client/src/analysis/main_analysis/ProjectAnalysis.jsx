import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Avatar,
  HStack,
  Divider,
  Heading,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiEdit, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "../../axios";
import DonutChart from "./charts/DonutChart";
import ProjectStatusBarChart from './charts/ProjectStatusBarChart';
import TaskInProjectChart from './charts/TaskInProjectChart';
import ProjectCreatedByAdminPolar from './charts/projByAdmin';
import TotalEmp from './charts/totalEmps';
import ProjectsByStatus from './charts/totalProj';
import LoadingScreen from '../../Loader';

const ProjectAnalysis = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  let adminInfoFromStorage = {};
  try {
    adminInfoFromStorage = JSON.parse(localStorage.getItem("adminInfo")) || {};
  } catch (e) {
    adminInfoFromStorage = {};
  }
  const { name, email } = location.state || adminInfoFromStorage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, projRes] = await Promise.all([
          axios.get("/api/project/employees", { withCredentials: true }),
          axios.get("/api/project/all-projects", { withCredentials: true }),
        ]);
        setEmployees(empRes.data.data || []);
        setProjects(projRes.data.data || []);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const ongoingCount = projects.filter(p => p.status === "ongoing").length;
  const completedCount = projects.filter(p => p.status === "completed").length;

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return <LoadingScreen/>;

  return (
    <Flex direction="column" height="100vh" color="white">
      {/* Top Navigation Bar */}
      <Flex bg="gray.800" color="white" px={6} py={3} align="center" justify="space-between">
        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">LOGO</Text>
          <Divider orientation="vertical" height="30px" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="teal.200"
            cursor="pointer"
            _hover={{ textDecoration: "underline", color: "teal.300" }}
            onClick={() => navigate('/adminDash')}
          >
            Admin Dashboard
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Avatar name={name} />
          <Box textAlign="right">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm">{email}</Text>
          </Box>
          <IconButton icon={<FiEdit />} onClick={() => navigate("/update-account")} aria-label="Edit" />
          <IconButton icon={<FiSettings />} onClick={() => navigate("/change-password")} aria-label="Settings" />
          <IconButton icon={<FiLogOut />} onClick={handleLogout} aria-label="Logout" />
        </HStack>
      </Flex>

      {/* Main Layout */}
      <Flex flex="1" overflow="hidden" bg="gray.700">
        {/* Left Sidebar - Employees */}
        <Box w="250px" p={4} bg="gray.600" overflowY="auto" m={2} borderRadius="md">
          <Heading size="sm" mb={4}>Employees</Heading>
          <Divider mb={3} />
          <VStack align="start" spacing={4}>
            {employees.length === 0 && (
              <Text color="gray.300">No employees found.</Text>
            )}
            {employees.map(emp => (
              <Box
                as="button"
                key={emp._id}
                width="100%"
                textAlign="left"
                onClick={() => {
                  if (emp.assignProjects) {
                    navigate(`/employee-dashboard/${emp._id}`, {
                      state: {
                        name: emp.name,
                        email: emp.email,
                        status: emp.status,
                        projectId: emp.assignProjects,
                      },
                    });
                    localStorage.setItem("projectId", emp.assignProjects);
                  } else {
                    alert("This employee is not assigned to any project.");
                  }
                }}
              >
                <HStack
                  border="2px"
                  width="100%"
                  padding={3}
                  borderColor="gray.700"
                  borderRadius={6}
                  bg="gray.700"
                  transition="transform 0.2s ease-in-out"
                  _hover={{
                    transform: "translateX(-5px)",
                    boxShadow: "md",
                  }}
                >
                  <Avatar
                    size="sm"
                    name={emp.name || emp.email}
                    src={emp.avatar ? `data:image/jpeg;base64,${emp.avatar}` : undefined}
                  />
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
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Main Content - Six Charts in 2 Rows of 3 */}
        <Box flex="1" p={6} bg="gray.800" overflowY="auto">
          <Heading size="lg" mb={6}>Project Analysis</Heading>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
           
            <DonutChart ongoing={ongoingCount} completed={completedCount} />
            <ProjectStatusBarChart projects={projects}/>
            <TaskInProjectChart projects={projects}/>
            <ProjectCreatedByAdminPolar projects={projects}/>
            <TotalEmp projects={projects}/>
            <ProjectsByStatus projects={projects}/>
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

export default ProjectAnalysis;
