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
} from '@chakra-ui/react';
import { FiEdit, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProjectAnalysis = () => {
  const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // Try to get from location.state first, then fallback to localStorage
    let adminInfoFromStorage = {};
    try {
      adminInfoFromStorage = JSON.parse(localStorage.getItem("adminInfo")) || {};
    } catch (e) {
      adminInfoFromStorage = {};
    }
    const { name, email } = location.state || adminInfoFromStorage;
    console.log(`name : ${name}, email ${email}`);
    
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

    const handleLogout = async () => {
      try {
        await axios.post("/api/auth/logout",{}, { withCredentials: true });
        localStorage.clear();
        navigate("/login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    const handleAdminDashboardClick = () => {
      navigate('/adminDash', { replace: true });
      // If you want to force a full reload:
      window.location.href = '/adminDash';
    };


    useEffect(() => {
      fetchData();
    }, []);

    if (loading) return <Text p={4}>Loading Admin Dashboard...</Text>;

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
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Main Content - Charts Placeholder */}
        <Box flex="1" p={6} bg="gray.800" overflowY="auto">
          <Heading size="lg" mb={4}>Project Analysis</Heading>
          <Box
            mt={4}
            p={6}
            bg="gray.900"
            borderRadius="md"
            boxShadow="md"
            height="300px"
          >
            <Text textAlign="center" color="gray.400">
              Charts and analytics will appear here.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProjectAnalysis;
