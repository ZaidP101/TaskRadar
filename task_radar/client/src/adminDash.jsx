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
    Button,
    Select,
  } from "@chakra-ui/react";
  import { FiLogOut, FiEdit, FiSettings, FiTrash2  } from "react-icons/fi";
  import { AddIcon } from '@chakra-ui/icons';
  import DonutChart from "./charts/DonutChart";


  const AdminDashboard = () => {
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

    const handleDeleteProject = async (projectId) => {
      if (!window.confirm("Are you sure you want to delete this project?")) return;
      try {
        await axios.delete(`/api/project/${projectId}`, { withCredentials: true });
        fetchData(); // Refresh the project list
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete project.");
      }
    };

    const handleUpdateStatus = async (projectId, newStatus) => {
      try {
        const response = await axios.post(
          "/api/project/completed",
          { projectId },
          { withCredentials: true }
        );
        
        if (response.data.success) {
          // Update local state instead of refetching all data
          setProjects(prev => prev.map(proj => 
            proj._id === projectId ? {...proj, status: newStatus} : proj
          ));
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to update status");
        setProjects(prev => prev.map(proj => 
          proj._id === projectId ? {...proj, status: "ongoing"} : proj
        ));
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
            <Divider marginBottom={3}/>
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

          {/* Right Side - Projects */}
          <Box flex="1" p={4} overflowY="auto" bg="gray.700">
            <Heading size="md" mb={3} marginBottom={4}>Projects</Heading>
            <Divider marginBottom={5}/>
            {projects.length === 0 ? (
              <Text>No projects found.</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {projects.map((project) => (
                  <Box
                    key={project._id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={3}
                    shadow="sm"
                    bg="gray.600"
                    transition="transform 0.2s ease-in-out" 
                    _hover={{ transform: "translateY(-5px)",boxShadow: "md",}}
                    position="relative"
                  >
                    <IconButton
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      aria-label="Delete project"
                      onClick={() => handleDeleteProject(project._id)}
                      position="absolute"
                      top={2}
                      right={2}
                    />
                    <Heading size="sm" mb={2} marginBottom={3}>{project.name} </Heading>
                    <Divider/>
                    <Text fontSize="sm" mb={1}  marginBottom={3} marginTop={3} ><strong>Description:</strong> {project.description || "N/A"}</Text>
                    <Divider marginBottom={3}/>
                    <HStack spacing={2} alignItems={"center"} justifyContent={"space-between"} marginBottom={3}>
                      <Box>
                        <Text fontSize="sm" mb={1}><strong>Status:</strong></Text>
                        <Select
                          value={project.status}
                          onChange={(e) => handleUpdateStatus(project._id, e.target.value)}
                          size="sm"
                          width="120px"
                          isDisabled={project.status === "completed"}
                          bg="gray.700"
                          color="white"
                          borderColor="gray.600"
                          _focus={{ bg: "gray.700", color: "white" }}
                          _hover={{ bg: "gray.700", color: "white" }}
                        >
                          <option style={{ background: "#2D3748", color: "white" }} value="ongoing">Ongoing</option>
                          <option style={{ background: "#2D3748", color: "white" }} value="completed">Completed</option>
                        </Select>
                      </Box>
                      <Text fontSize="sm" mb={1}><strong>Total Emp:</strong> {project.totalEmployees}</Text>
                      <Text fontSize="sm" mb={1}><strong>Total Task:</strong> {project.totalTasks}</Text>
                    </HStack>

                    {project.createdBy && (
                      <Text fontSize="sm" mb={1} marginBottom={4}><strong>Created By:</strong> {project.createdBy.name || project.createdBy.email}</Text>
                    )}
                    <Button
                      marginBottom={2}
                      bg={"gray.300"}
                      w={"100%"}
                      onClick={() => navigate(`/project-dashboard/${project._id}`, {
                        state: {
                          adminName: name,
                          adminEmail: email,
                        }
                      })}
                    >
                      VIEW
                    </Button>

                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
          <Box
            position="fixed"
            bottom="20px"
            right="20px"
            zIndex="tooltip"
          >
            <Button
              colorScheme="blue"
              borderRadius="full"
              boxShadow="2xl"
              w="60px"
              h="60px"
              onClick={() => navigate("/create-project")}
              aria-label="Add Project"
              sx={{
                transform: "translateY(0)",
                transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
                _hover: {
                  transform: "translateY(-3px)",
                  boxShadow: "xl"
                },
                _active: {
                  transform: "scale(0.95)"
                }
              }}
            >
              <AddIcon boxSize={6} />
            </Button>
          </Box>

        </Flex>
        <Box mb={8} maxW="400px">
            <DonutChart
              ongoing={projects.filter(p => p.status === 'ongoing').length}
              completed={projects.filter(p => p.status === 'completed').length}
            />
          </Box>
      </Flex>
      
    );
  };

  export default AdminDashboard;
