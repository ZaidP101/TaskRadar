import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
import LoadingScreen from "../../Loader";
import TotalTaskComp from "./p_charts/taskComp";
import TaskStatus from "./p_charts/taskStatus";
import Priority from "./p_charts/priority";
import TaskByAdmin from "../e_analysis/e_charts/taskByAdmin";
import TaskByTime from "./p_charts/taskByTime";
import EmployeeStatus from "./p_charts/totalEmp";

const TaskAnalysis = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
 const adminInfoFromStorage = JSON.parse(localStorage.getItem("adminInfo")) || {};
const { adminName, adminEmail, avatar } = location.state || {
  adminName: adminInfoFromStorage.name,
  adminEmail: adminInfoFromStorage.email,
  avatar: adminInfoFromStorage.avatar
};

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          axios.get(`/api/project/${projectId}`, { withCredentials: true }),
          axios.get(`/api/task/project/${projectId}`, { withCredentials: true }),
        ]);
        setProject(projectRes.data.project || {});
        setEmployees(projectRes.data.project.employees || []);
        setTasks(tasksRes.data.data || []); // <-- SET TASKS HERE
      } catch (err) {
        console.error("Error fetching project or tasks:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [projectId]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <Flex direction="column" height="100vh" color={"white"}>
      {/* Top Navigation Bar */}
      <Flex bg={"gray.800"} color={"white"} px={6} py={3} align="center" justify="space-between">
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
        <Box w="250px" p={4} bg="gray.600" overflowY="auto" m={2} borderRadius="md">
          <Heading size="sm" mb={4}>Project Members</Heading>
          <Divider mb={3} />
          <VStack align="start" spacing={4}>
            {employees.length === 0 ? (
              <Text color="gray.400" fontStyle="italic">No employees assigned to this project.</Text>
            ) : (
              employees.map(emp => (
                <HStack key={emp._id} width="100%">
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
              ))
            )}
          </VStack>
        </Box>

        {/* Right Side - Task Analysis Content */}
        <Box flex="1" p={6} bg="gray.800" overflowY="auto">
          <Heading size="lg" mb={6}>Project Analysis</Heading>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
            {/* Now tasks is defined and passed correctly! */}
            <TotalTaskComp tasks={tasks} />
            <TaskStatus tasks={tasks}/>
            <Priority tasks={tasks}/>
            <TaskByAdmin tasks={tasks}/>
            <TaskByTime tasks={tasks}/>
            <EmployeeStatus employees={employees}/>

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

export default TaskAnalysis;
