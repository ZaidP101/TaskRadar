import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "./axios";
import {
  Box, Text, Heading, VStack, HStack, Flex, Avatar, Divider, IconButton, SimpleGrid, Badge, Button
} from "@chakra-ui/react";
import { FiLogOut, FiEdit, FiSettings } from "react-icons/fi";

const ProjectDashboard = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { adminName, adminEmail } = location.state || {};

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, taskRes] = await Promise.all([
        axios.get(`/api/project/${projectId}`, { withCredentials: true }),
        axios.get(`/api/task/project/${projectId}`, { withCredentials: true }),
      ]);
      setProject(projRes.data.project || {});
      setEmployees(projRes.data.project.employees || []);
      setTasks(taskRes.data.data || []);
    } catch (err) {
      console.error("Error fetching project dashboard data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);
    useEffect(() => {
        console.log("Project employees:", employees);
    }, [employees]);


  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return <Text p={4}>Loading Project Dashboard...</Text>;

  return (
    <Flex direction="column" height="100vh" color={"white"}>
      {/* Top Navigation Bar (same as AdminDashboard) */}
      <Flex bg={"gray.800"} color={"white"} px={6} py={3} align="center" justify="space-between">
        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">LOGO</Text>
          <Divider orientation="vertical" height="30px" />
          <Text fontSize="md">Admin Dashboard</Text>
        </HStack>
        <HStack spacing={4}>
          <Avatar name={adminName} />
          <Box textAlign="right">
            <Text fontWeight="bold">{adminName}</Text>
            <Text fontSize="sm">{adminEmail}</Text>
          </Box>
          <IconButton icon={<FiEdit />} onClick={() => navigate("/update-account")} aria-label="Edit" />
          <IconButton icon={<FiSettings />} onClick={() => navigate("/change-password")} aria-label="Settings" />
          <IconButton icon={<FiLogOut />} onClick={handleLogout} aria-label="Logout" />
        </HStack>
      </Flex>

      {/* Main Layout */}
      <Flex flex="1" overflow="hidden" bg={"gray.700"}>
        {/* Left Sidebar - Project Employees */}
        <Box w="250px" p={4} bg="gray.600" overflowY="auto" margin={2} borderRadius={"md"}>
          <Heading size="sm" mb={4}>Project Members</Heading>
          <Divider marginBottom={3}/>
          <VStack align="start" spacing={4}>
                {employees.map(emp => (
                    <HStack key={emp._id || emp.email || Math.random()}>
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
                ))}
            </VStack>

        </Box>

        {/* Center - Task Board */}
        <Box flex="1" p={4} overflowY="auto" bg="gray.700">
          <Heading size="md" mb={3}>Task Board</Heading>
          <Divider marginBottom={5}/>
          {tasks.length === 0 ? (
            <Text>No tasks found.</Text>
          ) : (
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              {tasks.map((task) => {
                const deadline = new Date(task.deadline);
                const now = new Date();
                const timeLeft =
                  deadline > now
                    ? Math.ceil((deadline - now) / (1000 * 60 * 60)) + "h"
                    : "Overdue";
                const timeSpent = (task.totalTimeSpent / 3600).toFixed(1) + "h";
                return (
                  <Box
                    key={task._id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={3}
                    shadow="sm"
                    bg="gray.600"
                    transition="transform 0.2s ease-in-out"
                    _hover={{ transform: "translateY(-5px)", boxShadow: "md" }}
                  >
                    <Heading size="sm" mb={1}>{task.title}</Heading>
                    <Text fontWeight="bold">Status: {task.status}</Text>
                    <Divider />
                    <Text fontWeight="bold">Description:</Text>
                    <Text>{task.description}</Text>
                    <Divider />
                    <HStack alignItems={"center"} justifyContent={"space-between"} marginTop={2} marginBottom={2}>
                      <Box>
                        <Text fontWeight="semibold">Priority:</Text>
                        <Badge fontSize="0.75em" colorScheme={
                          task.priority === "high" ? "red" :
                          task.priority === "medium" ? "orange" : "green"
                        }>
                          {task.priority}
                        </Badge>
                      </Box>
                      <Box><Text fontWeight="semibold">Deadline:</Text><Text>{deadline.toLocaleDateString()}</Text></Box>
                      <Box><Text fontWeight="semibold">Time Left:</Text><Text>{timeLeft}</Text></Box>
                    </HStack>
                    <Divider />
                    <HStack alignItems={"center"} justifyContent={"space-between"} marginTop={2} marginBottom={2}>
                      <Box><Text fontWeight="semibold">Time Spent:</Text><Text>{timeSpent}</Text></Box>
                      <Box>
                        <Text fontWeight="semibold">Assigned By:</Text>
                        <Text>{task.assignedBy?.name || "Admin"}</Text>
                      </Box>
                    </HStack>
                  </Box>
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProjectDashboard;
