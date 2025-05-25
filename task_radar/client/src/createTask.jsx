// CreateTaskComponent.jsx
import { useForm } from "react-hook-form";
import {
  Box, Stack, Heading, FormControl, FormLabel, Input, Textarea,
  Button, Select, useToast, Spinner
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./axios";

const CreateTask = () => {
  const { projectId } = useParams();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/task/employee/${projectId}`, { withCredentials: true })
      .then(res => setEmployees(res.data.data || []))
      .catch(() => setEmployees([]))
      .finally(() => setLoading(false));
  }, [projectId]);

  const onSubmit = async (values) => {
    try {
      await axios.post("/api/task/create-task", {
        title: values.title,
        description: values.description,
        project: projectId,
        assignedTo: values.assignedTo,
        deadline: values.deadline,
        priority: values.priority,
      }, { withCredentials: true });

      toast({
        title: "Task created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      reset();
      navigate(`/project-dashboard/${projectId}`);
    } catch (err) {
      toast({
        title: "Error creating task.",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={16}
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      bg="gray.800"
      color="white"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Create New Task
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={errors.title}>
            <FormLabel>Task Title</FormLabel>
            <Input
              placeholder="Enter task title"
              {...register("title", { required: "Task title is required" })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Task description"
              {...register("description")}
            />
          </FormControl>
          <FormControl isInvalid={errors.assignedTo}>
            <FormLabel>Assign To</FormLabel>
            <Select
              placeholder="Select employee"
              {...register("assignedTo", { required: "Select an employee" })}
            >
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isInvalid={errors.deadline}>
            <FormLabel>Deadline</FormLabel>
            <Input
              type="date"
              {...register("deadline", { required: "Deadline is required" })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select {...register("priority")}>
              <option value="low">Low</option>
              <option value="medium" defaultValue>Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </Select>
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            w="full"
            mt={4}
          >
            Create Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateTask;
