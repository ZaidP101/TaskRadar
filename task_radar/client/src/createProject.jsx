import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Checkbox,
  CheckboxGroup,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";

const CreateProject = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all employees (non-admins)
    axios.get("/api/project/employees", { withCredentials: true })
      .then(res => setEmployees(res.data.data || []))
      .catch(() => setEmployees([]))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (values) => {
    try {
      await axios.post("/api/project/create", {
        name: values.name,
        description: values.description,
        employees: values.employees,
      }, { withCredentials: true });

      toast({
        title: "Project created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      reset();
      navigate("/adminDash");
    } catch (err) {
      toast({
        title: "Error creating project.",
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
        Create New Project
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Project Name</FormLabel>
            <Input
              placeholder="Enter project name"
              {...register("name", { required: "Project name is required" })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Project description"
              {...register("description")}
            />
          </FormControl>
          <FormControl isInvalid={errors.employees}>
            <FormLabel>Assign Employees</FormLabel>
            <CheckboxGroup>
              <VStack align="start" maxH="200px" overflowY="auto">
                {employees.map(emp => (
                  <Checkbox
                    key={emp._id}
                    value={emp._id}
                    {...register("employees", { required: "Select at least one employee" })}
                  >
                    {emp.name} ({emp.email})
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </FormControl>
          {errors.employees && (
            <Box color="red.300" fontSize="sm">{errors.employees.message}</Box>
          )}
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            w="full"
            mt={4}
          >
            Create Project
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateProject;
