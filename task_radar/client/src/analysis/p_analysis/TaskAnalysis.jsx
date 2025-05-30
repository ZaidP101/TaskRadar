import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  Tooltip,
} from "@chakra-ui/react";
import { FiLogOut, FiEdit, FiSettings } from "react-icons/fi";

const TaskAnalysis = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { adminName, adminEmail } = location.state || {};

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjectData = async () => {
    try {
      const res = await axios.get(`/api/project/${projectId}`, {
        withCredentials: true,
      });
      setProject(res.data.project || {});
      setEmployees(res.data.project.employees || []);
    } catch (err) {
      console.error("Error fetching project:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get("/api/project/employees", {
        withCredentials: true,
      });
      setAllEmployees(res.data.data || []);
    } catch {
      setAllEmployees([]);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetchAllEmployees();
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

  const handleAddEmployee = async (empId) => {
    try {
      await axios.post(
        "/api/project/add-employees",
        {
          projectId,
          employees: [empId],
        },
        { withCredentials: true }
      );
      fetchProjectData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add employee");
    }
  };

  const handleRemoveEmployee = async (empId) => {
    try {
      await axios.post(
        "/api/project/remove-employees",
        {
          projectId,
          employees: [empId],
        },
        { withCredentials: true }
      );
      fetchProjectData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove employee");
    }
  };

  if (loading) return <Text p={4}>Loading Task Analysis...</Text>;

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
        <Box w="250px" p={4} bg="gray.600" overflowY="auto" margin={2} borderRadius={"md"}>
            <Heading size="sm" mb={4}>Project Members</Heading>
            <Divider marginBottom={3} />
            <VStack align="start" spacing={4}>
                {employees.length === 0 ? (
                <Text color="gray.400" fontStyle="italic">No employees assigned to this project.</Text>
                ) : (
                employees.map(emp => (
                    <HStack key={emp._id}>
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
                ))
                )}
            </VStack>
        </Box>


        {/* Right Side - Task Analysis Content */}
        <Box flex="1" p={4}>
          {/* Add your Task Analysis components here */}
          <Heading size="md" mb={4}>Task Analysis for Project</Heading>
          {/* You can render charts, stats, tables etc. here */}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TaskAnalysis;
