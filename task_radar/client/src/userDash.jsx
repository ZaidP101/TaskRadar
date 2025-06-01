import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "./axios";
import {
  Box,
  Text,
  Heading,
  Select,
  SimpleGrid,
  Badge,
  Stack,
  Button,
  Container,
  VStack,
  HStack,
  Flex,
  Avatar,
  Spacer,
  Divider,
  IconButton
} from "@chakra-ui/react";
import { FiLogOut, FiEdit, FiSettings, FiBarChart2 } from "react-icons/fi";
import LoadingScreen from "./Loader";

const EmployeeDashboard = () => {
  const { projectId: paramProjectId, employeeId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pauseReasons, setPauseReasons] = useState({});
  const [project, setProject] = useState(null);
   const [empInfo, setEmpInfo] = useState(null); //added
  const location = useLocation();
  const { name, email, status, projectId: stateProjectId } = location.state || {};
  const navigate = useNavigate();

  console.log(`${name}, ${email}, ${status}`)

  const effectiveProjectId = paramProjectId || stateProjectId || localStorage.getItem("projectId");

  const fetchDashboardData = async () => {
    try {
    const [tasksRes, employeesRes, projectRes] = await Promise.all([
    axios.get(`/api/task/project/${effectiveProjectId}`, { withCredentials: true }),
    axios.get(`/api/task/employee/${effectiveProjectId}`, { withCredentials: true }),
    axios.get(`/api/project/${effectiveProjectId}`, { withCredentials: true })
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
      await axios.post("/api/auth/logout", { withCredentials: true });
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const updateStatus = async (taskId, newStatus, pauseReason = "") => {
    try {
      const response = await fetch(`http://localhost:3000/api/task/status/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status: newStatus,
          ...(newStatus === "paused" && { pauseReason })
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      if (newStatus !== "paused") {
        setPauseReasons((prev) => {
          const updated = { ...prev };
          delete updated[taskId];
          return updated;
        });
      }
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to update task status:", error);
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

 if (loading) return <LoadingScreen />;

  return (
    <Flex direction="column" height="100vh" >
      {/* Top Navigation Bar */}
      <Flex bg={"gray.800"} color={"white"} px={6} py={3} align="center" justify="space-between">
        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">LOGO</Text>
          <Divider orientation="vertical" height="30px" />
          <Text fontSize="md">Project: {project?.name || "Unnamed Project"}</Text>
        </HStack>

        <HStack spacing={4}>
          <Avatar name="Member 1" />
          <Box textAlign="right">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm">{email}</Text>
            <Text
                fontSize="sm"
                fontWeight="bold"
                color={status === "busy" ? "red.500" : status === "free" ? "green.500" : "gray.500"}
              >
              Status: {status}
            </Text>
          </Box>
          <IconButton icon={<FiEdit />} onClick={() => navigate("/update-account")} aria-label="Edit" />
          <IconButton icon={<FiSettings />} onClick={() => navigate("/change-password")} aria-label="Settings" />
          <IconButton icon={<FiLogOut />} onClick={handleLogout} aria-label="Logout" />
        </HStack>
      </Flex>

      {/* Main Layout */}
      <Flex flex="1" overflow="hidden" bg={"gray.700"} color={"white"}>
        {/* Left Sidebar - Employees */}
        <Box w="250px" p={4} bg="gray.600" overflowY="auto" margin={2} borderRadius={"md"}>
          <Heading size="sm" mb={4}>Project Members</Heading>
          <VStack align="start" spacing={4}>
            {employees.map(emp => {
              console.log(employees); // Debug output
              return (
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
              );
            })}
          </VStack>
        </Box>

        {/* Task Board */}
            <Box flex="1" p={4} overflowY="auto" bg="gray.700">
               <Flex align="center" justify="space-between" mb={3}>
                  <Heading size="md">Task Board</Heading>
                  <IconButton
                    icon={<FiBarChart2 />}
                    aria-label="Task Analysis"
                    size="md"
                    _hover={{ bg: "white.600", transform: "scale(1.1)" }}
                    _active={{ bg: "white.700" }}
                    color="purple"
                    onClick={() => navigate(`/employee-analysis/${paramProjectId}/${employeeId}`, {
                      state: {name,email,status,paramProjectId}
                    })}
                  />
                </Flex>
              {tasks.length === 0 ? (
              <Text>No tasks found.</Text>
              ) : (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
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
             _hover={{ transform: "translateY(-5px)",boxShadow: "md",}}
          >
            <Heading size="sm" mb={1}>{task.title}</Heading>
            <Stack spacing={1.5} fontSize="sm">
              <Box>
                <Text fontWeight="semibold">Status:</Text>
                <Select
                  size="sm"
                  value={task.status}
                  onChange={(e) => {
                    const selectedStatus = e.target.value;
                    if (selectedStatus === "paused") {
                      setPauseReasons((prev) => ({
                        ...prev,
                        [task._id]: "",
                      }));
                    } else {
                      updateStatus(task._id, selectedStatus);
                    }
                  }}
                  isDisabled={task.status === "completed"}
                  bg="gray.700"
                  color="white"
                  borderColor="gray.600"
                  variant="filled"
                  fontWeight="semibold"
                  _focus={{ bg: "gray.700", color: "white" }}
                  _hover={{ bg: "gray.700", color: "white" }}
                >
                  {["todo", "in-progress", "paused", "resume", "ready-for-review", "completed"].map((s) => (
                    <option
                      key={s}
                      value={s}
                      style={{ background: "#2D3748", color: "white" }}
                    >
                      {s}
                    </option>
                  ))}
                </Select>

              </Box>
              <Divider/>
              <Text fontWeight={"bold"}>Description:</Text>
              <Text>{task.description}</Text>


              <Divider/>
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
                <Text fontWeight="semibold">Pause Reason:</Text>
                {pauseReasons.hasOwnProperty(task._id) ? (
                  <Select
                    size="sm"
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                    _focus={{ bg: "gray.700", color: "white" }}
                    _hover={{ bg: "gray.700", color: "white" }}
                    value={pauseReasons[task._id]}
                    onChange={(e) => {
                      const reason = e.target.value;
                      setPauseReasons((prev) => ({
                        ...prev,
                        [task._id]: reason,
                      }));
                      if (reason !== "") {
                        updateStatus(task._id, "paused", reason);
                      }
                    }}
                  >
                    <option style={{ background: "#2D3748", color: "white" }} value="">
                      Select reason
                    </option>
                    {["system error", "break", "shift ended", "meeting"].map(reason => (
                      <option
                        key={reason}
                        value={reason}
                        style={{ background: "#2D3748", color: "white" }}
                      >
                        {reason}
                      </option>
                    ))}
                  </Select>
                ) : task.status === "paused" ? (
                  <Button size="xs" onClick={() => updateStatus(task._id, "resume")}>
                    Resume
                  </Button>
                ) : (
                  <Text>{task.pauseReason || "—"}</Text>
                )}
              </Box>

              <Box>
                <Text fontWeight="semibold">Assigned By:</Text>
                <Text>{task.assignedBy?.name || "Admin"}</Text>
              </Box>
              </HStack>
            </Stack>
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


export default EmployeeDashboard;
