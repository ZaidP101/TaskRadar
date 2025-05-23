  import { useEffect, useState } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import axios from "./axios";
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
    Badge,
  } from "@chakra-ui/react";
  import { FiLogOut, FiEdit, FiSettings } from "react-icons/fi";

  const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { name, email } = location.state || {};

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
        await axios.get("/api/users/logout", { withCredentials: true });
        localStorage.clear();
        navigate("/login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (loading) return <Text p={4}>Loading Admin Dashboard...</Text>;

    return (
      <Flex direction="column" height="100vh">
        {/* Top Navigation Bar */}
        <Flex bg={"gray.800"} color={"white"} px={6} py={3} align="center" justify="space-between">
          <HStack spacing={4}>
            <Text fontSize="xl" fontWeight="bold">LOGO</Text>
            <Divider orientation="vertical" height="30px" />
            <Text fontSize="md">Admin Dashboard</Text>
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
        <Flex flex="1" overflow="hidden" bg={"gray.700"}>
          {/* Left Sidebar - Employees */}
          <Box w="250px" p={4} bg="gray.600" overflowY="auto" margin={2} borderRadius={"md"}>
            <Heading size="sm" mb={4}>Employees</Heading>
            <VStack align="start" spacing={4}>
              {employees.map(emp => (
                <HStack key={emp._id}>
                  <Avatar size="sm" name={emp.name || emp.email} />
                  <Box>
                    <Text fontWeight="bold" color={
                      emp.status === "busy" ? "red.500" :
                      emp.status === "free" ? "green.500" :
                      "gray.500"
                    }>
                      {emp.name || emp.email}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Right Side - Projects */}
          <Box flex="1" p={4} overflowY="auto" bg="gray.700">
            <Heading size="md" mb={3}>Projects</Heading>
            {projects.length === 0 ? (
              <Text>No projects found.</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {projects.map((project) => (
                  <Box
                    key={project._id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={3}
                    shadow="sm"
                    bg="gray.600"
                  >
                    <Heading size="sm" mb={2}>{project.name}</Heading>
                    <Text fontSize="sm" mb={1}><strong>Description:</strong> {project.description || "N/A"}</Text>
                    <Text fontSize="sm" mb={1}><strong>Status:</strong> {project.status || "In Progress"}</Text>
                    <Text fontSize="sm" mb={1}><strong>Total Emp:</strong> {project.totalEmployees}</Text>
                    <Text fontSize="sm" mb={1}><strong>Total Task:</strong> {project.totalTasks}</Text>
                    <Text fontSize="sm" mb={1}><strong>Task:</strong> {}</Text>
                    {project.createdBy && (
                      <Text fontSize="sm" mb={1}><strong>Created By:</strong> {project.createdBy.name || project.createdBy.email}</Text>
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Flex>
    );
  };

  export default AdminDashboard;
